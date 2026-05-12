# Analisando Comércio Mundial com Hadoop: desafios reais de um projeto MapReduce

Em um projeto de Big Data na faculdade, o desafio foi processar milhões de linhas de dados de comércio internacional usando **Apache Hadoop** e o modelo de programação **MapReduce**. O dataset era do UN Comtrade — uma base pública com registros de exportações e importações de países do mundo inteiro, de 1988 até os dias de hoje.

Neste post vou mostrar o que construímos, os erros reais que encontramos e como chegamos às respostas.

---

## O problema: dados demais para um computador só

O arquivo tinha esta cara:

```
country_or_area ; year ; comm_code ; commodity            ; flow   ; trade_usd ; weight_kg ; quantity_name   ; quantity ; category
Afghanistan     ; 2016 ; 010410    ; Sheep, live          ; Export ; 6088      ; 2339      ; Number of items ; 51       ; 01_live_animals
Albania         ; 2016 ; 010511    ; Fowls, live < 185g   ; Import ; 2671732   ; 254652    ; Number of items ; 5629138  ; 01_live_animals
...
```

Milhões de linhas assim. Perguntas simples como _"quantas transações o Brasil fez?"_ ou _"qual foi a transação mais cara por ano e país?"_ exigem varrer o arquivo inteiro — algo lento demais para fazer de forma convencional.

A solução é o **Hadoop MapReduce**: dividir o arquivo entre várias máquinas e processar tudo em paralelo.

---

## Como o MapReduce funciona (em 30 segundos)

Imagine que você precisa contar quantas vezes cada palavra aparece em um livro enorme. Você divide o livro entre 10 pessoas (**Mappers**), cada uma conta as palavras do seu trecho e passa um resumo para um contador central (**Reducer**), que soma tudo.

```
Arquivo CSV
    ↓
[MAPPER]  — lê cada linha e extrai o que importa
    ↓
[COMBINER] — soma parcialmente antes de enviar pela rede (opcional, mas eficiente)
    ↓
[SHUFFLE & SORT] — Hadoop agrupa automaticamente por chave
    ↓
[REDUCER] — recebe os grupos e calcula o resultado final
    ↓
Arquivo de saída
```

O programador escreve apenas o Mapper e o Reducer. O Hadoop cuida de tudo no meio.

---

## Os 8 jobs do projeto

Cada "job" responde uma pergunta sobre os dados:

| Job | Pergunta                                                    |
| --- | ----------------------------------------------------------- |
| 1   | Quantas transações envolvem o Brasil?                       |
| 2   | Quantas transações por ano?                                 |
| 3   | Quantas transações por categoria?                           |
| 4   | Quantas transações por tipo de fluxo (Export, Import...)?   |
| 5   | Qual o valor médio das transações por ano só no Brasil?     |
| 6   | Qual a transação mais cara e mais barata no Brasil em 2016? |
| 7   | Qual o valor médio das exportações brasileiras por ano?     |
| 8   | Qual a transação com maior e menor valor por ano e país?    |

---

## Job 4 — o mais simples: contando por tipo de fluxo

O **Job 4** é o clássico "Word Count" do MapReduce: conta quantas transações existem para cada tipo de fluxo (`Export`, `Import`, `Re-Export`, `Re-Import`).

### Como funciona

O Mapper lê cada linha do CSV, extrai a coluna `flow` (coluna 4) e emite o par `(fluxo, 1)`:

```
Linha: "Albania;2016;010511;Fowls...;Import;..."
         ↓
Mapper emite: ("Import", 1)

Linha: "Albania;2016;010600;Animals...;Export;..."
         ↓
Mapper emite: ("Export", 1)
```

Depois de processar todas as linhas, o **Combiner** soma localmente antes de enviar pela rede:

```
Buffer local após Mapper:
  ("Import", 1), ("Import", 1), ("Import", 1), ("Export", 1), ...

Combiner comprime para:
  ("Import", 17)   ← saem 2 pares em vez de 22 pela rede
  ("Export", 5)
```

O **Reducer** recebe os parciais de todas as máquinas e soma o total final.

### Resultado

```
Export      2.855.135
Import      4.846.943
Re-Export     367.070
Re-Import     153.677
```

Simples, eficiente, e o Combiner reduziu drasticamente o tráfego de rede.

---

## Job 8 — o mais complexo: min e max por ano e país

O **Job 8** precisava responder: _para cada combinação de ano e país, qual foi a transação com maior e menor valor?_

Isso exigiu criar tipos de dados customizados — o Hadoop padrão não tem uma forma nativa de carregar "mínimo e máximo juntos" como chave ou valor.

### Tipos customizados criados

**`YearCountryKey`** — chave composta com ano + país:

```java
// Precisa de compareTo() porque o Hadoop ordena as chaves
// Ordena por ano primeiro, depois por país (alfabético)
public int compareTo(YearCountryKey o) {
    int y = Integer.compare(year, o.year);
    if (y != 0) return y;
    return country.compareTo(o.country);
}
```

**`MinMaxAmountWritable`** — valor que carrega mínimo e máximo juntos:

```java
public void merge(MinMaxAmountWritable other) {
    min = Math.min(min, other.min);
    max = Math.max(max, other.max);
}
```

### Como funciona

```
Linha: "Albania;2016;...;trade_usd=26485;...;quantity=64000;..."
         ↓
Mapper emite:
  chave:  YearCountryKey(2016, "Albania")
  valor:  MinMaxAmountWritable(min=26485, max=26485)

... outras linhas da Albania 2016 ...

Combiner agrupa localmente:
  chave: (2016, "Albania")
  valor: MinMaxAmountWritable(min=26485, max=14265937)

Reducer recebe parciais de todos os nós e faz o merge final:
  saída: "2016\tAlbania" → "26485.0\t14265937.0"
```

---

## Os erros que encontramos (e como resolvemos)

### Erro 1 — o mínimo era sempre 0.0

Ao rodar o Job 8, o resultado era suspeito:

```
1988    Australia    0.0    9.7535689788E10
1988    Finland      0.0    1.0394190848E10
1989    Brazil       0.0    9.2491235328E10
...
```

**O mínimo era 0.0 para absolutamente todos os países e anos.** Isso é estatisticamente improvável — significaria que todo país, em todo ano, tinha pelo menos uma transação com valor zero.

#### Investigando a causa

O Mapper aceitava qualquer valor numérico, incluindo zero:

```java
Double amount = CsvLineParser.parseDoubleField(cols[COL_AMOUNT]);
if (amount == null) {
    return; // descarta apenas nulos
}
// ← zero passa sem filtro!
context.write(key, new MinMaxAmountWritable(amount));
```

No dataset UN Comtrade, muitos registros têm `quantity = 0` porque a quantidade física não foi registrada para aquela mercadoria (metais preciosos, serviços, re-exportações). Esses zeros "contaminavam" o cálculo do mínimo.

#### A correção

Uma linha:

```java
// antes
if (amount == null) { return; }

// depois
if (amount == null || amount <= 0) { return; }
```

Com esse filtro, valores zero passam a ser ignorados e o mínimo passa a refletir a menor transação real.

---

### Erro 2 — a coluna errada estava sendo lida

Após corrigir o Erro 1, o resultado ainda parecia estranho. O mínimo e máximo vinham da coluna `quantity` (número de itens exportados), não do valor monetário da transação.

```
2016    Albania    6853.0    5629138.0
         ↑ min              ↑ max
     (6.853 itens)   (5.6 milhões de pintinhos)
```

Isso não responde _"transação mais cara e mais barata"_ — responde _"transação com mais e menos itens"_.

#### A raiz do problema

O requisito dizia _"maior e menor preço (com base na coluna amount)"_. No código, `COL_AMOUNT = 8` apontava para `quantity` (coluna física), quando o valor monetário real fica na coluna 5 (`trade_usd`).

```
country_or_area ; year ; ... ; flow   ; trade_usd ; weight_kg ; quantity_name ; quantity ; category
                              col 4     col 5       col 6        col 7          col 8      col 9
                                          ↑                                      ↑
                                    valor em USD                           número de itens
                                    (o que queremos)                       (o que estava sendo lido)
```

#### A correção

Trocar a constante no Mapper:

```java
// antes — lia quantity (número de itens)
Double amount = CsvLineParser.parseDoubleField(cols[COL_AMOUNT]);

// depois — lê trade_usd (valor em dólares)
Double amount = CsvLineParser.parseDoubleField(cols[COL_PRICE]);
```

#### Resultado corrigido

```
2016    Afghanistan     3958.0       6088.0
2016    Albania        26485.0    14265937.0
2008    Afghanistan  1026804.0    1026804.0
```

Agora os números representam **dólares americanos** — fazem sentido como "preço" de uma transação comercial.

---

## O que aprendemos

**1. Erros de domínio são silenciosos.** Nenhum dos dois erros lançou uma exceção. O programa rodou normalmente, gerou um arquivo de saída — mas os resultados estavam errados. Em Big Data, um filtro ausente ou uma coluna trocada distorce silenciosamente milhões de registros.

**2. Questionar o output é parte do trabalho.** Ver `0.0` como mínimo para todos os países foi o sinal para investigar. Ver números na casa dos trilhões foi o sinal para questionar a coluna.

**3. O Combiner é simples mas poderoso.** Nos dois jobs, o Combiner reduziu drasticamente o volume de dados trafegando pela rede — de dezenas de pares para um único objeto por nó. Só funciona quando a operação é associativa (soma, min, max — sim; média direta — não).

**4. Tipos customizados abrem possibilidades.** O `MinMaxAmountWritable` e o `YearCountryKey` mostraram que o Hadoop é extensível: quando os tipos padrão não bastam, você cria os seus e o framework usa normalmente.

---

## Conclusão

O projeto mostrou na prática a diferença entre código correto e análise correta. O Java estava certo — mas o que estava sendo calculado não respondia a pergunta. Entender o dado, questionar o resultado e rastrear o pipeline de ponta a ponta são habilidades tão importantes quanto saber escrever o Mapper e o Reducer.

---

_Projeto desenvolvido em Java 11 com Hadoop 3.3.6. Dataset: UN Comtrade — comércio internacional de mercadorias._

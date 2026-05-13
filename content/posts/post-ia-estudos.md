---
tags:
  - inteligência-artificial

  - estudos

  - produtividade

  - ferramentas

aliases:
  - Como uso IA para estudar
  - IA nos estudos

title: Como uso Inteligência Artificial para estudar

desc: Um guia prático sobre como uso NotebookLM, Obsidian e Claude para eliminar o atrito no aprendizado e estudar com mais profundidade.

date: 2025-05-13

tag: ia, estudos, notebooklm, obsidian, claude

readTime: 6 min

thumb:
---

**Categoria:** Inteligencia Artificial · Estudo · Ferramentas  
**Tags:** Claude, NotebookLm, Obsidian  
**Data:** 2026-05-13

## A ideia

Durante muito tempo, estudar significava abrir um PDF, tentar entender, abrir outro, perder o fio, esquecer o que havia lido no paragrafo anterior. O problema não era falta de esforço era **excesso de atrito**.

A inteligência artificial não substitui o estudo. Mas ela elimina as barreiras chatas que ficam entre você e o aprendizado de verdade: organizar notas, resumir conteúdo longo, tirar dúvidas rápidas, conectar ideias.

Aqui conto como uso **três ferramentas** dentro de um fluxo que funciona pra mim de verdade, no dia a dia.

---

## As ferramentas

### NotebookLM - Converse com seus documentos

O NotebookLM, ferramenta do google e gratuito, permite carregar PDFs, artigos, livros ou vídeos do YouTube e criar uma IA treinada _só naquele material_. É como ter um professor que leu tudo e está pronto para responder.

**Para que uso:**

- Fazer perguntas direto sobre o PDF da disciplina sem reler tudo
- Gerar resumos automáticos por capítulo
- Pedir uma lista de conceitos-chave antes de revisar
- Analizar se vale o esforço de ler o documento completo, ler apenas parte dele ou não ler nada.

---

### Obsidian - Uma segunda memória

O Obsidian é um app de notas que funciona como um segundo cérebro. Você escreve em Markdown, cria links entre ideias e vê tudo conectado num mapa visual.
Além dos inumeros plugins extremamente uteis como board kamban, lista de tasks com checkbox, plugins de estilização.

**Para que uso:**

- Criar notas de todos os conteudos que eu vejo e aprendo.
- Linkar conceitos entre matérias diferentes
- Organizar projetos, leituras e anotações de aula
- Centralizar meus conhecimentos de forma concisa.
- criar boards de tasks para gerenciar minhas tarefas de forma pratica a qualquer momento.

---

### Claude - professor pessoal e colega de estudo.

O Claude é o tipo de IA que não apenas responde ela explica, questiona de volta e ajuda você a pensar mais fundo. Uso para os momentos em que preciso realmente _entender_ algo, não só ter uma resposta rápida.

**Para que uso:**

- Pedir explicações simples e depois aprofundar progressivamente
- Criar exercícios e questões personalizadas para praticar
- Pedir para ele revisar um raciocínio que escrevi ele aponta erros
- Explorar um tema de ângulos diferentes antes de concluir

---

## O fluxo em 3 passos

```
NotebookLM → Extrair  →
Claude → Aprofundar  →
Obsidian → Consolidar
```

### Passo 1 — Carrego o material e extraio o essencial no `NotebookLM`

Jogo o PDF, artigo ou vídeo no NotebookLM. Peço um resumo inicial, os conceitos principais e as perguntas que o texto levanta. Faço perguntas como "o que o autor quer dizer com X?" sem precisar reler tudo.

### Passo 2 — Aprofundo o que não entendi no `Claude`

Os conceitos que ficaram nebulosos, levo para o Claude. Peço analogias, exemplos práticos, e às vezes peço para ele me fazer perguntas para testar se realmente entendi. É como ter um tutor disponível 24h.

### Passo 3 — Registro e conecto no `Obsidian`

Só anoto o que _entendi de verdade_ — com minhas palavras. Crio links para notas anteriores, formando uma rede de conhecimento. O que está no Obsidian é meu: posso acessar, revisar e construir em cima para sempre.

---

## Dicas que aprendi na prática

**1. Nunca copie a resposta da IA direto**
Leia, entenda, feche a janela e escreva com suas palavras. Se você não consegue reescrever sem olhar, ainda não entendeu.

**2. Peça para a IA te questionar, não só explicar**
No Claude, escreva: _"Explique tal coisa e depois me faça 3 perguntas para testar meu entendimento."_ Ser questionado é quase tão eficiente quanto ensinar.

**3. Uso o NotebookLM antes de ler**
Antes de encarar um texto longo, peço sempre um "mapa" do que tem ali encontrar. Com contexto prévio, o cérebro absorve o conteúdo com muito mais eficiência.

**4. No Obsidian, uma ideia por nota**
Cada nota deve ter um único conceito, com título em forma de frase completa. "Spring Security" é uma categoria. "Spring Security usa filtros encadeados para interceptar requisições antes de chegar ao controller" é uma nota. A diferença importa muito quando você começa a linkar.

**5. Seja específico com o contexto**
Em vez de "me explique injeção de dependência", escreva: _"Estou aprendendo Spring Boot e já entendo o básico de anotações como @Component e @Autowired. Me explique como o contexto do Spring decide qual bean injetar quando há mais de uma implementação de uma interface."_ Contexto = respostas melhores.

**6. As ferramentas se combinam, não se excluem**
NotebookLM para extrair, Claude para aprofundar, Obsidian para consolidar. Cada ferramenta tem seu momento no fluxo.

## Exemplos pessoais

Esta semana na faculdade fiz.um projeto com o hadoop (veja o blog de hadoop para saber mais) e uma das questões pedida pelo professor tinha uma pequena ambiguidade que passou despercebido no desenvolvimento.
A questão era:

> Transação com o maior e menor preço (com base na coluna amount), por ano e país

O problema estava na estrutura da tabela. Ela tinha três campos relevantes:

| Campo    | Descrição                                                    |
| -------- | ------------------------------------------------------------ |
| `amount` | Quantidade de produtos envolvidos na transação               |
| `unit`   | Unidade de contagem — kg, litros, toneladas, m³, unidades... |
| `price`  | Preço total da transação                                     |

A ambiguidade estava exatamente aí. O enunciado pede para usar `amount`, mas as unidades variam completamente entre transações, comparar toneladas com litros não produz um resultado significativo. Então, o que a questão realmente pedia?

- O maior `amount` bruto, ignorando a incompatibilidade de unidades?
- O maior `price`, que já representa o valor monetário total?
- O produto de `price` / `amount` formando um valor por unidade?

Cada interpretação levaria a um resultado diferente, e nenhuma delas estava explicitamente errada dado o enunciado.

**É aqui que o Claude me ajudou..** Em vez de perguntar "qual é a resposta certa", descrevi minha lógica completa. O que havia implementado, por que havia escolhido aquela abordagem e onde sentia que algo não fechava pois o resultado estava estranho de mais. A pergunta foi direta: _"Baseado no que desenvolvi, qual é o erro na minha lógica dado esses resultados?"_

A resposta foi clara: minha lógica estava correta para o que estava sendo pedido. O enunciado era genuinamente ambíguo, e a interpretação que eu havia feito usar `amount` como solicitado, comparando dentro de cada grupo de ano e país era a mais defensável. O resultado que o haddop estava retornando não era erro de implementação, era consequência direta das diferentes unidades na base de dados.

Para outras ias, ao ver um resultado tão estranho iriam imediatamente dizer o que está errado. Não é um corretor automático que diz certo ou errado. Isso ilustra bem o que diferencia o Claude das outras ferramentas. É um interlocutor que analisa o raciocínio junto com você e não foca em te dar uma resposta certa mas resolver seu problema.

---
tags:
  - deploy
  - aiven
  - mysql
  - hibernate
  - spring-boot
  - render
  - vercel
  - jpa
  - devops
aliases:
  - Deploy Aiven Primary Key
  - Hibernate ManyToMany Primary Key
  - sql_require_primary_key
title: O deploy, o banco gerenciado e a tabela que se recusava a existir
desc: Como subi o VitaSmile pra nuvem (Aiven + Render + Vercel) e descobri, do jeito difícil, por que o Hibernate não conseguia criar a tabela de junção do meu @ManyToMany
date: 16 Jun 2026
tag: DevOps
readTime: 9 min
thumb:
---

O backend rodava redondo na minha máquina. O frontend também. O banco estava modelado, o JWT funcionando, os relatórios saindo. Faltava o passo que parece o mais simples e nunca é: colocar tudo no ar.

O que eu não esperava era passar a maior parte do tempo caçando uma **tabela que simplesmente não existia** no banco, e descobrir que a culpa não era do meu código.

---

## Escolhendo onde hospedar (e desistindo algumas vezes)

A primeira ideia foi o **Railway**: sobe tudo num lugar, MySQL com um clique. Perfeito até o trial expirar.

Pensei na **Azure** (tinha conta), mas era configuração demais pro momento. No fim, montei um trio gratuito que mantinha o meu MySQL:

| Camada | Serviço | Por quê |
|---|---|---|
| Banco | **Aiven** (MySQL gerenciado) | free tier de MySQL, que é raro |
| Backend | **Render** (Docker) | builda direto do meu Dockerfile |
| Frontend | **Vercel** | feito pra SPA, com build próprio |

A parte boa: como eu já tinha preparado tudo pra ler de **variáveis de ambiente** (banco, segredo do JWT, porta, CORS), trocar de plataforma não exigiu mexer no código. Só mudou *onde* eu configurava as variáveis.

---

## O Aiven e o detalhe do SSL

O Aiven me deu uma string de conexão assim:

```
mysql://avnadmin:senha@host.aivencloud.com:19146/defaultdb?ssl-mode=REQUIRED
```

Primeiro tropeço bobo: o cliente `mysql` usa `ssl-mode`, mas o **JDBC do Spring** usa `sslMode` (camelCase). E no Spring as credenciais vão separadas, fora da URL:

```
SPRING_DATASOURCE_URL=jdbc:mysql://host.aivencloud.com:19146/defaultdb?sslMode=REQUIRED
SPRING_DATASOURCE_USERNAME=avnadmin
SPRING_DATASOURCE_PASSWORD=...
```

Sem o `sslMode=REQUIRED` o Aiven recusa a conexão. Ajustei, o backend conectou. Achei que estava feito.

---

## O erro: uma tabela que não existe

Fui testar e, ao adicionar uma especialidade a um dentista, estourou isto no log:

```
Caused by: java.sql.SQLSyntaxErrorException:
Table 'defaultdb.dentista_especialidade' doesn't exist
    at ... GenerationTargetToDatabase.accept (hibernate schema tool)
```

Estranho. Eu uso `spring.jpa.hibernate.ddl-auto=update`, então o Hibernate deveria criar essa tabela sozinho no startup. E o mais curioso: logo **depois** desse erro, o próprio log mostrava o Hibernate criando as chaves estrangeiras das *outras* tabelas com sucesso:

```
Hibernate: alter table dentistas add constraint ... references usuarios
Hibernate: alter table procedimento add constraint ... references especialidades
```

Ou seja: as tabelas das entidades nasceram. Só a **tabela de junção** do meu `@ManyToMany` não.

---

## Investigando: o código está certo?

Antes de sair chutando, fui varrer. O mapeamento estava correto:

```java
@ManyToMany
@JoinTable(
    name = "dentista_especialidade",
    joinColumns = @JoinColumn(name = "id_dentista"),
    inverseJoinColumns = @JoinColumn(name = "id_especialidade")
)
private List<Especialidade> especialidades;
```

`ddl-auto=update` era a única config de schema, sem nenhum override. A entidade `Especialidade` era uma entidade válida. Tudo no lugar.

A pista real estava na ordem do log: o Hibernate cria as tabelas das entidades **primeiro** e as de junção **por último**. Se a junção não aparecia, era ela especificamente que falhava ao ser criada. Mas por quê, se o mesmo código funciona no meu MySQL local?

---

## A descoberta: o banco gerenciado tem regras próprias

Como eu tinha o cliente `mysql` num container Docker, fui criar a tabela na mão pra ver o que acontecia:

```sql
CREATE TABLE dentista_especialidade (
  id_dentista BIGINT NOT NULL,
  id_especialidade BIGINT NOT NULL,
  ...
);
```

E o Aiven respondeu, finalmente, com a mensagem que explicava tudo:

```
ERROR 3750 (HY000): Unable to create or change a table without a primary key,
when the system variable 'sql_require_primary_key' is set.
```

Pronto. O **Aiven liga `sql_require_primary_key=ON`** por padrão, e ele **proíbe criar qualquer tabela sem chave primária**. E a tabela de junção que o Hibernate gera pra um `@ManyToMany` com `List`… **não tem chave primária**. Ela tem só as duas FKs.

Por isso só *essa* tabela falhava: todas as outras tinham `@Id`, então tinham PK. A junção não, e o banco gerenciado a rejeitava silenciosamente no meio do schema sync.

Confirmei o valor:

```sql
SELECT @@GLOBAL.sql_require_primary_key;  -- 1 (ligado)
```

No meu MySQL local essa variável é `0`. Foi por isso que nunca tinha visto o problema.

---

## A correção

Tinha dois caminhos.

**1. Criar a tabela com chave primária composta** (cirúrgico, sem perder dados):

```sql
CREATE TABLE dentista_especialidade (
  id_dentista BIGINT NOT NULL,
  id_especialidade BIGINT NOT NULL,
  PRIMARY KEY (id_dentista, id_especialidade),
  CONSTRAINT fk_de_dentista FOREIGN KEY (id_dentista) REFERENCES dentistas (id),
  CONSTRAINT fk_de_especialidade FOREIGN KEY (id_especialidade) REFERENCES especialidades (id)
);
```

Além de resolver, a PK composta é até um modelo melhor: impede o mesmo par dentista+especialidade duplicado.

**2. Desligar a exigência no Aiven.** Como isso é uma config gerenciada (um `SET GLOBAL` é bloqueado), fui na *Advanced configuration* do serviço e mudei `sql_require_primary_key` para `false`. Aí o próprio Hibernate passa a conseguir criar a junção sozinho em qualquer banco novo:

```sql
SELECT @@GLOBAL.sql_require_primary_key;  -- 0 (agora desligado)
```

Escolhi desligar pra não ter que repetir o SQL manual a cada banco novo.

---

## Bônus: CORS em produção

Quando o front no Vercel finalmente falou com o backend no Render, veio o clássico:

```
Access to XMLHttpRequest at 'https://...onrender.com/auth/login'
from origin 'https://...vercel.app' has been blocked by CORS policy
```

Testei na mão:

```
OPTIONS /auth/login   →   HTTP/1.1 403 Forbidden   (sem Access-Control-Allow-Origin)
```

A causa era simples: meu backend só liberava `http://localhost:4200` por padrão. Como eu já tinha deixado o CORS configurável por variável, foi só apontar pra origem real:

```
APP_CORS_ALLOWED_ORIGINS=https://meu-front.vercel.app
```

Redeploy, e o login passou.

---

## O que ficou

A lição que levo é que **"funciona na minha máquina" e "funciona num serviço gerenciado" são coisas diferentes**, e a diferença mora em configurações que você nem sabia que existiam.

- Banco gerenciado tem regras próprias. O `sql_require_primary_key` do Aiven não existe por maldade: tabela sem PK atrapalha replicação. Meu MySQL local só era mais permissivo.
- O Hibernate com `ddl-auto=update` é ótimo pra prototipar, mas depende dele "adivinhar" o schema. No dia que isso falha, você precisa entender o DDL que ele gera. (O próximo passo natural aqui seria versionar o schema com Flyway.)
- Deixar tudo em **variável de ambiente** desde cedo salvou o deploy: troquei de plataforma e resolvi o CORS sem tocar numa linha de código.

No fim, o que parecia um bug no meu projeto era uma regra do banco encontrando uma escolha de design do ORM. O sistema está no ar, e eu aprendi mais nesse deploy do que em metade do desenvolvimento.

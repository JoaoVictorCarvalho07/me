---
tags:
  - docker
  - docker-compose
  - mysql
  - backend
  - devops
  - java
  - spring-boot
aliases:
  - Docker Ambiente Separado
  - Docker MySQL Spring Boot
  - Docker Compose Iniciante
title: Docker na prática — quando você quer um ambiente separado e o MySQL resolve não cooperar
desc: Como aprendi Docker e Docker Compose na prática tentando isolar o banco de dados de um projeto Spring Boot sem quebrar o que já tinha na máquina
date: 27 Mai 2026
tag: DevOps
readTime: 12 min
thumb: assets/img/blog/docker_learning.avif
---

Eu já tinha o MySQL instalado direto na minha máquina. Funcionava, estava configurado, os projetos da faculdade dependiam dele. Aí comecei um novo projeto , um sistema de gestão de consultas em Spring Boot e não queria que o banco desse projeto interferisse no que já existia.

A solução óbvia era Docker. E aí começou a aventura.

---

## Docker vs Docker Compose - a diferença que ninguém explica de cara

Quando comecei a ler sobre Docker, tudo parecia a mesma coisa. Levei um tempo para entender que são duas ferramentas com propósitos diferentes.

**Docker** é a ferramenta base. Você gerencia um container por vez via linha de comando. Quer subir um MySQL? Você digita tudo na mão.

**Docker Compose** é uma camada acima. Você descreve seus containers num arquivo `docker-compose.yml` e sobe tudo com um único comando. É mais prático mesmo quando você tem só um container porque a configuração fica documentada, versionada junto com o projeto, e qualquer outro dev que clonar o repo já sabe o que rodar.

A virada de chave foi entender que o Compose não substitui o Docker ele orquestra.

---

## O primeiro problema: o container não subia

Rodei o comando mais simples possível:

```powershell
docker run --name mysql-container -p 3306:3306 mysql:latest
```

O container subiu, ficou alguns segundos em execução e morreu. Status: `Exited (1)`.

```
CONTAINER ID   IMAGE         COMMAND                  STATUS
4a613e308585   mysql:latest  "docker-entrypoint.s…"   Exited (1) 3 minutes ago
```

A causa era simples: o MySQL exige pelo menos uma variável de ambiente para iniciar. Sem ela, ele encerra sozinho. As opções são:

| Variável                         | Comportamento            |
| -------------------------------- | ------------------------ |
| `MYSQL_ROOT_PASSWORD`            | define a senha do root   |
| `MYSQL_ALLOW_EMPTY_PASSWORD=yes` | sobe sem senha           |
| `MYSQL_RANDOM_ROOT_PASSWORD=yes` | gera uma senha aleatória |

Sem nenhuma dessas, o processo simplesmente não continua. O container sai com código 1 e não diz muita coisa útil no terminal você precisa rodar `docker logs mysql-container` para ver o erro real.

---

## Estruturando com Docker Compose e .env

Com isso resolvido, migrei para o Compose. A estrutura do projeto ficou assim:

```
projeto/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── .env          ← variáveis do backend e do banco
│   └── src/
└── frontend/
    ├── Dockerfile
    ├── .env          ← variáveis do frontend
    └── src/
```

Cada serviço com seu próprio `.env`, apontados pelo Compose via `env_file`. O banco compartilha as variáveis do backend porque é ele quem define usuário, senha e nome do banco.

---

## O conflito silencioso: MYSQL_USER=root

Aqui teve um erro que me custou tempo.

No `.env` coloquei:

```env
MYSQL_USER=root
MYSQL_PASSWORD=1234
```

O container subia sem erro aparente, mas ao tentar conectar com esse usuário recebia acesso negado. Conectando como `root` funcionava, mas o usuário `projeto_user` que eu esperava encontrar simplesmente não existia.

O problema: **o MySQL já tem um usuário `root` criado por padrão**. A variável `MYSQL_USER` serve para criar um _novo_ usuário na primeira inicialização. Se você passa `root`, ele ignora e não cria nada. E se o volume já existia de uma inicialização anterior com outra configuração, os dados antigos prevalecem sobre o `.env`.

A solução foi dois passos:

1. Trocar `MYSQL_USER` para um nome diferente:

```env
// antes
MYSQL_USER=root
// depois
MYSQL_USER=projeto_user
```

2. Limpar o volume antes de recriar:

```powershell
docker compose down
docker volume rm projeto_mysql_data
docker compose up -d mysql
```

O MySQL só executa a criação automática de usuário na **primeira** inicialização. Com o volume antigo, ele acha que já está configurado e pula essa etapa.

---

## A confusão com as portas

Essa foi a parte que mais me confundiu tentando conectar pelo DataGrip.

Mudei o mapeamento de portas para `3307:3306` porque já tinha o MySQL local na 3306 e queria evitar conflito. O formato é sempre `PORTA_DO_HOST:PORTA_DO_CONTAINER`.

O que demorei para entender é que essa regra não é global ela depende de _quem_ está fazendo a conexão:

```
Seu PC (DataGrip, IntelliJ)
      │
      │  localhost:3307   ← porta do host
      ▼
┌─────────────────────┐
│   mysql-container   │
│   porta 3306        │  ← porta interna do container
└─────────────────────┘
      │
      │  mysql:3306       ← nome do serviço, porta interna
      ▼
backend-container
```

| Quem conecta                    | Host        | Porta  |
| ------------------------------- | ----------- | ------ |
| DataGrip / IntelliJ (no seu PC) | `localhost` | `3307` |
| Spring rodando no PC            | `localhost` | `3307` |
| Spring dentro do Docker Compose | `mysql`     | `3306` |

Por isso o `application.properties` usa `localhost:3307` quando você roda o Spring pela IDE, mas o `.env` usa `mysql:3306` quando o backend sobe via Compose. Não é inconsistência é contexto diferente.

---

## Docker Desktop como interface

Em vez de ficar no terminal para tudo, preferi usar o Docker Desktop para acompanhar o que estava acontecendo. Ele mostra em tempo real quais containers estão rodando, os logs de cada um, uso de memória e CPU e tem um terminal integrado para entrar dentro do container quando precisar.

Para verificar se o usuário foi criado corretamente, entrei direto no MySQL pelo Desktop sem precisar lembrar do comando completo:

```sql
SELECT user, host FROM mysql.user;
```

E para criar o usuário manualmente quando o `.env` não funcionou por causa do volume antigo:

```sql
CREATE USER 'projeto_user'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON sistema_gestao_consultas.* TO 'projeto_user'@'%';
FLUSH PRIVILEGES;
```

O Desktop não substitui saber os comandos mas torna muito mais fácil debugar sem ter que ficar alternando entre janelas.

---

## O Dockerfile do Spring Boot

Para o backend em Java, precisei de um Dockerfile com **multi-stage build**. O motivo é simples: a imagem que compila (com Maven + JDK) pesa em torno de 700MB. A imagem que só _roda_ o `.jar` compilado (com JRE) pesa cerca de 180MB.

```dockerfile
# Stage 1 — compilação
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2 — runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

O stage de build é descartado no final. A imagem que vai para produção só tem o `.jar` e o mínimo para executá-lo.

---

## O que ficou

Docker resolve um problema real: ambientes que funcionam igual em qualquer máquina, sem interferir no que já está instalado. Mas a curva de aprendizado não está nos conceitos, está nos detalhes que só aparecem quando você tenta na prática.

O container que morre sem dizer o motivo. O usuário que não é criado porque o volume já existia. A porta que funciona diferente dependendo de quem está conectando. Cada um desses foi um momento de "mas por que?" que virou entendimento.

O projeto continua em desenvolvimento. O ambiente de banco agora está isolado, versionado junto com o código, e funciona igual no meu PC e no do time.

---

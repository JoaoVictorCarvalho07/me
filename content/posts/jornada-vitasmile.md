---
tags:
  - projeto
  - fullstack
  - angular
  - spring-boot
  - mysql
  - jwt
  - portfolio
aliases:
  - Jornada VitaSmile
  - Desenvolvimento VitaSmile
  - Projeto Final Gestão de Consultas
title: VitaSmile, a jornada de construir um sistema de ponta a ponta
desc: Do nome da marca ao deploy na nuvem, o relato de como construí um sistema de gestão de consultas odontológicas em Angular, Spring Boot e MySQL
date: 16 Jun 2026
tag: Projeto
readTime: 11 min
thumb: assets/img/blog/vitasmile.avif
---

O briefing era um projeto final: um sistema de gestão de consultas odontológicas, com **Angular + Spring Boot + banco relacional**, autenticação, perfis de usuário e relatórios. Parecia direto. No papel sempre parece.

Esse post é o relato da jornada inteira, não só o que ficou pronto, mas as decisões e os tropeços que ensinaram no caminho.

---

## Antes de uma linha de código: marca e modelagem

A primeira tarefa nem era programar: era criar uma identidade. Nasceu o **VitaSmile**, com uma paleta em tons de índigo que segui no sistema inteiro (depois virou até variáveis CSS reaproveitadas em tudo).

Em paralelo, modelei o domínio. Duas decisões aqui definiram o resto do projeto:

- **Login centralizado em `Usuario`.** O enunciado sugeria repetir `nome/cpf/email` em `usuarios`, `pacientes` e `dentistas`. Preferi um `Usuario` único (onde mora a credencial e o perfil) e `Paciente`/`Dentista` como extensões 1 para 1. Um só ponto de autenticação.
- **Valor no nível do item da consulta.** Criei `Procedimento` + `ConsultaProcedimento`, onde cada item guarda o próprio valor. Sem isso, um relatório financeiro fiel seria impossível depois, porque o preço varia por caso.

Modelar pensando no relatório que eu ainda nem tinha feito foi a melhor decisão do projeto.

---

## Backend primeiro

Decidi começar pelo backend pra o front consumir contratos já estáveis. Estrutura clássica em camadas: **Controller → Service → Repository → Entity**, com DTOs (`records`) na borda pra nunca expor entidade JPA direto.

As regras de negócio ficaram no **service**, não espalhadas:

- sem conflito de horário pro mesmo dentista;
- sem agendar no passado;
- cancelamento exige motivo;
- `data_fim` depois de `data_inicio`.

Validações simples com Bean Validation; regras de verdade no código.

---

## Segurança: JWT do jeito certo

Autenticação com **JWT stateless**. Um `JwtFilter` lê o token a cada requisição e popula o `SecurityContextHolder` (que é `ThreadLocal`, isolado por requisição). Senhas com BCrypt. Autorização por perfil com `@PreAuthorize` nas rotas sensíveis e regras de dono no service.

Esse "isolado por requisição" voltaria a importar mais tarde, num susto que contei à parte: o que parecia **vazamento de sessão entre usuários** era, na verdade, o front guardando o token no `localStorage`, que é compartilhado entre abas do mesmo navegador. O backend estava certo o tempo todo.

---

## O frontend e a dança entre Signal e RxJS

No Angular, a maior decisão de arquitetura foi _como_ gerenciar estado. Demorei pra entender que **Signal e RxJS não são rivais**: Signal pra estado e derivação, RxJS pro assíncrono (cache com `shareReplay`, cancelamento com `switchMap`). Montei até um motor de paginação reutilizável (`PagedCollection`) que junta os dois.

Esse assunto rendeu um post só dele: [[signals-vs-rxjs-angular]].

---

## Um app, três perfis

O que começou como "ADMIN e DENTISTA" virou **três perfis** (adicionei `PACIENTE`). E cada um vê um app diferente:

- **ADMIN:** tudo (dashboard, pacientes, dentistas, especialidades, procedimentos, relatórios, usuários).
- **DENTISTA:** suas consultas, dashboard com pendentes da semana, edita só os pacientes dele.
- **PACIENTE:** lista das próprias consultas (pode cancelar), procedimentos só pra ver, e contato.

A trava não é só esconder menu: tem `roleGuard` nas rotas e checagem de dono no backend. Esconder no front é UX; barrar no servidor é segurança.

---

## Os bugs que mais ensinaram

Três me marcaram:

1. **O erro de validação que deslogava o usuário.** Uma exceção sem tratamento virava `/error` → 401 → logout. A correção foi um `@RestControllerAdvice` padronizando todas as respostas de erro, e fazer o front deslogar **só** quando o token realmente expira (via um header `X-Token-Expired`).
2. **O "vazamento de sessão" que não existia no servidor.** Citei acima, era `localStorage` compartilhado entre abas, não estado global no backend.
3. **A tabela que o banco gerenciado se recusava a criar** no deploy. Essa virou um post inteiro: [[deploy-aiven-chave-primaria]].

Cada "mas por quê?" desses virou aprendizado que nenhum tutorial tinha me dado.

---

## Botar no ar

O deploy foi um capítulo à parte. Antes, preparei tudo pra ler de **variáveis de ambiente** (banco, segredo, porta, CORS) e containerizei com Docker, e o que aprendi nesse processo está em [[docker-ambiente-separado]].

Depois de uns serviços descartados (trial expirado, etc.), o sistema subiu com **Aiven (MySQL) + Render (backend) + Vercel (frontend)**. E aí veio a saga da chave primária e do CORS, contada em [[deploy-aiven-chave-primaria]].

---

## O que ficou

No fim, o VitaSmile não é só um CRUD. Tem autenticação por perfil, relatórios com ticket médio, landing page da clínica, tratamento de erros padronizado e está publicado.

Mas o que eu mais levo não é a lista de features, é o tipo de problema que só aparece quando você sai do tutorial: a exceção que desloga, o storage que vaza entre abas, o banco gerenciado com regras próprias. Construir de ponta a ponta me ensinou que **a parte difícil quase nunca é a que você planejou**, e que documentar e versionar cada decisão é o que transforma um susto em conhecimento.

O projeto segue evoluindo. E cada tropeço virou um post.

---
tags:
  - processo-seletivo
  - trainee
  - java
  - spring-boot
  - angular
  - mentoria
  - portfolio
aliases:
  - Processo Seletivo Trainee
  - Trainee Java e Angular
  - VitaSmile Processo Seletivo
title: Do processo seletivo ao sistema no ar, cursos, mentoria diária e um projeto de verdade
desc: O caminho que percorri num programa de trainee, com cursos de Java Spring Boot e Angular, mentoria diária e a construção do VitaSmile do zero ao deploy
date: 18 Jun 2026
tag: Carreira
readTime: 9 min
thumb: assets/img/blog/treinee_experience.avif
---

Entrei num programa de trainee e, diferente do que eu imaginava, o processo seletivo não foi só mandar currículo e esperar. Foi uma jornada de aprendizado de verdade: cursos, prática diária e, no fim, um projeto completo pra provar o que aprendi.

## Os cursos: a base de dois mundos

O programa tinha duas frentes bem definidas. De um lado, o backend com Java e Spring Boot. Do outro, o frontend com Angular. Os cursos construíram a base de cada um: no backend, a ideia de API REST, camadas, JPA e segurança; no frontend, componentes, rotas, consumo de API e reatividade.

A diferença pra um tutorial solto é que os dois mundos eram pensados desde o começo pra se encontrar num sistema só.

## A mentoria diária

A parte que mais acelerou foi a mentoria, e ela era diária, nos dois conteúdos.

No Java e Spring Boot, tive a mentoria do Luciano Morais da Luz Brum. No frontend com Angular, do Alafhi Lima. Todo dia de semana tinha acompanhamento dos dois lados, e isso mudou completamente o ritmo. Uma dúvida que travaria um dia inteiro virava uma conversa de minutos, e cada decisão de arquitetura passava pelo olhar de quem já fez aquilo em produção.

Mentoria diária faz exatamente isso: encurta a distância entre "li sobre" e "sei aplicar".

## O projeto final: o VitaSmile

A prova final do processo foi construir um sistema completo. Nasceu o VitaSmile, um sistema de gestão de consultas odontológicas, com Angular no frontend, Spring Boot no backend e MySQL no banco. Tinha login, perfis de usuário (admin, dentista e paciente), agendamento de consultas, cadastros e relatórios.

Não era um CRUD de exemplo. Tinha regra de negócio de verdade (conflito de horário, cancelamento com motivo, permissões por perfil) e precisava ir pro ar.

## Como o software foi construído

Comecei pelo backend, pra ter contratos estáveis antes da interface. Modelei o domínio já pensando no relatório, centralizei o login num usuário único e implementei autenticação com JWT e autorização por perfil.

No frontend, a maior decisão foi como gerenciar estado, e aprendi a combinar Signals (estado) com RxJS (assíncrono). Depois veio o deploy, que foi um capítulo de aprendizado por si só.

Cada uma dessas etapas virou um post mais detalhado:

- A jornada completa do projeto: [[jornada-vitasmile]]
- A decisão de estado no Angular: [[signals-vs-rxjs-angular]]
- Containerizar com Docker: [[docker-ambiente-separado]]
- O deploy e o susto do banco: [[deploy-aiven-chave-primaria]]

## O que ficou

Olhando pra trás, cada peça teve seu papel. Os cursos deram a base. A mentoria diária, com o Luciano no backend e o Alafhi no frontend, transformou teoria em prática e evitou que eu travasse em problemas bobos. E o projeto consolidou tudo, porque construir de ponta a ponta ensina o que nenhum curso isolado ensina: os detalhes que só aparecem quando as peças precisam funcionar juntas.

Saí do processo não só com um sistema publicado, mas sabendo conectar backend, frontend e banco com critério. E isso, no fim, era o ponto.

---
tags:
  -
  - java
  - spring-boot
  - react
  - typescript
  - projeto-real
aliases:
  - SGS CADI
  - Sistema CADI
  - Projeto CADI

title: SGS-CADI - construindo um sistema para quem realmente precisa
desc: A história do SGS-CADI, sistema de gestão para uma instituição de atendimento a pessoas com deficiência, e as decisões técnicas por trás dele
date: 12 Mai 2026
tag: Projeto
readTime: 5 min
thumb: assets/img/blog/sgs-cadi.webp
---


**Categoria:** Projeto · Desenvolvimento · Impacto Social  
**Tags:** java, spring-boot, react, typescript, projeto-real  
**Data:** 2026-05-12

---

## O que é o CADI?

O CADI, *Centro de Apoio ao Desenvolvimento Infantil*, é uma instituição que atende crianças e adolescentes com deficiências físicas, intelectuais e múltiplas. Lá, profissionais como terapeutas, professores e psicólogos trabalham lado a lado com famílias para promover desenvolvimento, inclusão e qualidade de vida.

É um lugar onde cada aluno tem uma história, um ritmo e um conjunto de necessidades únicas. E é exatamente essa complexidade que torna a gestão tão desafiadora.

---

## O problema que o projeto resolve

Antes do SGS-CADI, grande parte da gestão era feita de forma manual ou fragmentada: planilhas para frequência, cadernos de anotações para evolução dos alunos, comunicações via WhatsApp e processos de matrícula em papel.

Isso criava problemas reais:

- **Informação perdida**  anotações em papel desaparecem, planilhas ficam desatualizadas
- **Falta de visibilidade**  gestores não tinham uma visão consolidada dos alunos e turmas
- **Comunicação lenta**  notificar responsáveis sobre faltas, eventos ou comunicados era um processo manual
- **Sem histórico**  acompanhar a evolução de um aluno ao longo do tempo era difícil

O SGS-CADI nasceu para digitalizar e centralizar tudo isso.

---

## O que o sistema faz

O projeto foi construído em módulos, cada um cobrindo uma área da instituição:

**👥 Pessoas**  
Cadastro completo de alunos, responsáveis e colaboradores (professores, terapeutas, secretaria). Cada pessoa tem perfil, endereço, vínculo e acesso ao sistema de acordo com seu papel.

**📚 Acadêmico**  
Gerenciamento de turmas, horários, frequência e matrículas. Um professor pode registrar presença, a secretaria pode visualizar turmas e os responsáveis podem acompanhar a frequência do filho.

**📢 Mural Institucional**  
Espaço para a instituição publicar comunicados, avisos e informações para toda a comunidade. Cada publicação fica registrada com histórico.

**🔔 Notificações**  
Sistema de notificações por e-mail via RabbitMQ  faltas, comunicados, confirmações. Assíncrono e resiliente, para que a ausência momentânea do broker não quebre nada.

**🔐 Controle de Acesso**  
JWT + Spring Security com perfis distintos: Admin, Secretaria, Professor, Aluno e Responsável. Cada um vê e faz apenas o que é permitido ao seu papel.

---

## O processo de criação

### Como começou

O projeto começou como uma iniciativa para aprender arquitetura real com Java. Não um CRUD tutorial. Um sistema com regras de negócio, múltiplos perfis, integrações e complexidade suficiente para forçar decisões de design.

O CADI foi escolhido como domínio porque é um contexto rico  tem pessoas, turmas, vínculos complexos (aluno-responsável, aluno-turma, colaborador-turma), fluxos de notificação e necessidade de controle de acesso granular.

### As decisões técnicas

**Backend com Spring Boot e Java 21**  pela maturidade do ecossistema e pela necessidade de trabalhar com segurança, persistência e mensageria de forma integrada.

**Arquitetura modular monolítica**  não é um monólito desorganizado nem microsserviços prematuros. Os módulos (`iam`, `people`, `academic`, `communication`, `finance`, `psychosocial`) têm fronteiras claras e dependências controladas. Se um dia precisar virar microsserviços, a separação já existe.

**React + TypeScript no frontend**  tipagem forte reduz erros em formulários complexos, e o React facilita o desenvolvimento de interfaces dinâmicas como o mural e a gestão de turmas.

**Flyway para migrações**  cada mudança no banco é versionada e auditável. Em produção, nada muda sem rastreio.

**RabbitMQ com Outbox Pattern**  notificações são importantes, mas não são o núcleo do negócio. O sistema funciona mesmo sem o broker.

### O que foi mais difícil

O maior desafio técnico foi o modelo de **vínculo aluno-responsável**. Um aluno pode ter múltiplos responsáveis, cada responsável pode ter múltiplos alunos, e existe o conceito de "responsável primário". Modelar isso de forma que ficasse correto no banco e intuitivo na API levou várias iterações.

O segundo desafio foi o **RabbitMQ em produção**. A solução do Outbox Pattern + listener recovery nasceu exatamente aqui: quando percebemos que a aplicação não podia ficar refém do estado do broker.

---

## O que esse projeto significa

SGS-CADI não é só um projeto de portfólio. É uma tentativa de aplicar engenharia de software real a um problema real, em um contexto em que as pessoas afetadas são vulneráveis e merecem ferramentas que funcionem.

Cada decisão de arquitetura  desde o controle de acesso até a resiliência do broker  tem uma justificativa humana por trás: **quem usa esse sistema são professores que precisam registrar frequência rapidamente entre uma terapia e outra, e responsáveis que precisam saber se o filho foi à escola**.

Construir com essa consciência muda a forma como você escreve código.

---

*Feito com Java 21, Spring Boot 3.2, React, TypeScript e muito café.*

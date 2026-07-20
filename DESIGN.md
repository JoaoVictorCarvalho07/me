---
name: joao.dev() — Portfólio Pessoal
description: Portfólio de dev full-stack com jardim digital (projetos, blog, gostos, agora)
colors:
  signal-blue: "#0ea5e9"
  signal-deep: "#0369a1"
  paper-white: "#ffffff"
  slate-ink: "#1e293b"
  cool-surface: "#f8fafc"
  cool-surface-2: "#f1f5f9"
  hairline: "#e2e8f070"
  hairline-strong: "#e2e8f0"
  quiet-gray: "#475569"
  tag-neutral-bg: "#f1f5f9"
  tag-neutral-text: "#475569"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, Fira Code, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.15em"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "1.875rem"
  full: "9999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "#0369a1"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "0.75rem 1.25rem"
  button-primary-hover:
    backgroundColor: "#017cb2"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.xl}"
    padding: "0.75rem 1.25rem"
  button-outline-hover:
    textColor: "{colors.signal-blue}"
  card-standard:
    backgroundColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "1.5rem"
  tag:
    backgroundColor: "{colors.tag-neutral-bg}"
    textColor: "{colors.tag-neutral-text}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
---

# Design System: joao.dev() — Portfólio Pessoal

## 1. Overview

**Creative North Star: "O Sinal Limpo" (The Clear Signal)**

O sistema atual é um sinal técnico e discreto sobre um fundo neutro: uma cor de destaque azul-céu (`#0ea5e9`) age como farol, usada com moderação sobre grandes áreas de cinza-ardósia e branco/quase-preto. Tipograficamente é Inter em peso alto para títulos (800, tracking apertado) e peso normal para corpo — direto, sem serifas decorativas, sem voz rebuscada. Isso está alinhado com a personalidade definida em PRODUCT.md: **técnico, direto, vivo**.

O sistema hoje é honesto mas ainda genérico em alguns pontos: a paleta azul-céu + Inter + cards com sombra suave é uma combinação extremamente comum em portfólios de dev gerados rapidamente. Em 2026-07-07, a home page (`index.html`) removeu seu `hero-eyebrow` e o badge flutuante com blur (`hero-badge`), e trocou o grid de 4 cards idênticos (`preview-grid`) por uma composição assimétrica — um card em destaque (`preview-featured`) + uma lista compacta (`preview-list`) — fechando a lacuna que esta seção apontava. O padrão de "eyebrow" ainda existe em `page-header .eyebrow` (cabeçalho de todas as outras páginas) e em `blog-tag`; esses seguem como scaffolding repetitivo não resolvido, fora do escopo da sessão que corrigiu a home.

O sistema é bi-modal: todo token de cor tem uma leitura clara (`:root`) e uma leitura escura (`.dark`), trocadas via classe na tag `<html>` e persistidas em `localStorage`. Qualquer novo componente precisa funcionar nos dois registros.

**Key Characteristics:**
- Um único acento (`signal-blue`) carrega toda a identidade de cor; tudo mais é neutro.
- Peso tipográfico extremo (800) para títulos cria hierarquia sem precisar de cor.
- Superfícies flat em repouso; sombra e elevação só aparecem como resposta a hover.
- Cantos generosamente arredondados (até 1.875rem) em cards, mas botões e chips mais contidos.
- Movimento é sutil e utilitário hoje (fade-up de entrada, hover lift) — ainda não "vivo" no sentido que PRODUCT.md pede; ver Do's and Don'ts.

## 2. Colors

Paleta restrita: um acento (azul-céu) sobre uma escala neutra de ardósia, com inversão completa no modo escuro.

### Primary
- **Signal Blue** (`#0ea5e9` / dark `#38bdf8`): o farol, reservado a bordas, ícones, backgrounds e sublinhado de nav — nunca como texto corrido (ver Named Rule abaixo). Usado com moderação — nunca como fundo de área grande.
- **Signal Deep**: dois papéis com valores diferentes por tema — como **texto** (`hero h1 span`, `site-logo span`, `preview-card-arrow`, `footer-top`) usa `#0369a1` claro / `#0ea5e9` escuro (≈5.9:1 / ≈7.3:1 contra o fundo da página); como **fundo de botão** com texto branco em cima (`.btn-primary`), fica fixo em `#0369a1` nos dois temas — a variante escura de texto (`#0ea5e9`) só dá ≈2.8:1 com texto branco e falha AA como preenchimento sólido. Hover do botão primário: `#017cb2` (≈4.6:1 com texto branco), fixo nos dois temas.

### Neutral
- **Paper White** (`#ffffff`) / **Void Ink** (`#020617` no escuro): fundo base da página.
- **Slate Ink** (`#1e293b`) / **Frost** (`#f1f5f9` no escuro): cor de texto principal.
- **Cool Surface** (`#f8fafc`) / **Night Surface** (`#0f172a` no escuro): fundo de seções alternadas (`.section-alt`) e superfícies de card.
- **Cool Surface 2** (`#f1f5f9`) / (`#1e293b` no escuro): fundo de tags, ícones de botão em hover.
- **Hairline** (`rgba(226,232,240,.7)` / `#1e293b` no escuro): bordas de divisores e cards — sempre 1px, nunca decorativa.
- **Quiet Gray** (`#475569` / `#94a3b8` no escuro): texto secundário/muted — usado em descrições, metadados, legendas. Corrigido em 2026-07-07 (era `#94a3b8`/`#64748b`, ambos abaixo de 4.5:1 contra o fundo); os valores atuais medem ≈7.6:1 (claro) e ≈7.9:1 (escuro).

### Named Rules
**The One Accent Rule.** Signal Blue e Signal Deep são as únicas cores com significado semântico no sistema. Tudo mais é neutro. Não introduzir uma segunda cor de acento sem atualizar esta regra.

**The Text-Safe Blue Rule.** Signal Blue como texto corrido mede ≈2.8:1 no modo claro e falha WCAG AA. Sempre que o acento precisar aparecer como texto (não borda, ícone ou background), use Signal Deep.

**The Fill-Is-Not-Text Rule.** Uma cor "segura como texto sobre o fundo" não é automaticamente segura como *fundo sólido* com texto branco em cima — são cálculos de contraste diferentes. A variante escura de Signal Deep (`#0ea5e9`) passa AA como texto contra o fundo quase-preto (≈7.3:1), mas falha como preenchimento de botão com texto branco (≈2.8:1). `.btn-primary` por isso fixa `#0369a1` (fundo) e `#017cb2` (hover) nos dois temas, independente do valor de `--color-accent-2` usado como texto.

## 3. Typography

**Display/Body Font:** Inter (pesos 300/400/600/800), fallback `ui-sans-serif, system-ui, sans-serif`
**Label/Mono Font:** JetBrains Mono, fallback Fira Code, `ui-monospace, monospace`

**Character:** Uma única família sans-serif carrega todo o peso semântico através de variação de peso (400 → 800) e tracking negativo em títulos, não através de troca de fonte. É uma voz, não duas.

### Hierarchy
- **Display** (800, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.2, tracking -0.02em): título de hero (`h1`), único por página.
- **Headline** (800, `clamp(1.5rem, 3vw, 2rem)`, line-height 1.2, tracking -0.02em): títulos de seção (`h2`).
- **Title** (600, 1.125rem): subtítulos de card e componente (`h3`).
- **Body** (400, 1rem, line-height 1.7): parágrafos de conteúdo (`p`); em `.md-content` (posts do blog) sobe para 1.1rem/1.8 de line-height para leitura longa.
- **Label** (500, 0.6875–0.75rem, tracking 0.1–0.15em, uppercase, mono nas legendas de código): eyebrows, tags de blog, badges — ver nota no Overview sobre uso excessivo deste padrão.

### Named Rules
**The Weight-Not-Color Rule.** Hierarquia é comunicada primeiro por peso tipográfico (400/600/800) e tamanho, não por cor. Cor é reservada ao Signal Blue como pontuação, não como sistema de hierarquia.

## 4. Elevation

Sistema flat-por-padrão: nenhuma superfície tem sombra em repouso. Sombra é estritamente uma resposta a interação (hover), nunca um estado ambiente permanente.

### Shadow Vocabulary
- **shadow-card** (`0 4px 16px rgba(2,6,23,.06)` / dark `rgba(0,0,0,.25)`): elevação de repouso para cards de projeto (`.project-card`) — a única sombra presente sem interação, bem sutil.
- **shadow-soft** (`0 10px 30px rgba(2,6,23,.08)` / dark `rgba(0,0,0,.35)`): elevação de hover para cards, botão primário e badges — o "lift" que responde à interação do usuário.

### Named Rules
**The Hover-Earns-It Rule.** Elevação pronunciada (`shadow-soft`) só aparece em resposta a hover/interação. Nenhum elemento em repouso deve usar `shadow-soft` diretamente.

## 5. Components

### Buttons
- **Shape:** cantos bem arredondados (`--radius-xl`, 1.5rem) no tamanho padrão; `--radius-md` (0.75rem) na variante `.btn-sm`.
- **Primary:** fundo `#0369a1` fixo (nos dois temas, ver The Fill-Is-Not-Text Rule), texto branco, `shadow-soft` constante, hover clareia para `#017cb2` e intensifica a sombra com tom azul (`rgba(14,165,233,.25)`).
- **Outline:** borda 1px `hairline-strong`, texto na cor padrão; hover troca a borda para Signal Blue (sem preencher o fundo).
- **Dark (contraste):** fundo `#0f172a` / texto `#f1f5f9`, invertido no modo escuro — usado para CTAs de alto contraste fora do par accent/neutral.
- **Icon:** quadrado com padding 0.5rem, `--radius-md`, hover preenche com Cool Surface 2.

### Chips / Tags
- **Style:** fundo Cool Surface 2, texto slate/quiet a 475569, `--radius-sm` (0.5rem), sem borda. Peso 500, tamanho 0.75rem.
- **Filter tabs (variante ativa):** mesma forma mas com `--radius-lg`, borda 1px hairline; estado ativo preenche com Signal Deep e texto branco.

### Cards
- **Corner Style:** `--radius-2xl` (1.875rem) — o raio mais generoso do sistema, reservado a containers de conteúdo (featured card, project card, blog card, social card, skills card, preview list).
- **Background:** `--color-card` (branco / `#0f172a` no escuro).
- **Border:** 1px hairline sempre presente, mesmo com sombra — os dois nunca competem.
- **Shadow Strategy:** `shadow-card` em repouso (projetos) ou nenhuma (featured/blog/list), `shadow-soft` + `translateY(-2px a -4px)` no hover.
- **Internal Padding:** 1.25–2rem dependendo do card.
- **Social card (variante nomeada):** cada rede social tem uma cor de assinatura própria (`GitHub #6e40c9`, `LinkedIn #0a66c2`, `Instagram` gradiente de marca, `WhatsApp #25d366`) aplicada só na borda de hover e no wash de fundo (`::before` a 6% de opacidade) — a única exceção deliberada à regra de acento único, porque a cor aqui é identidade da rede, não do produto.

### Featured + Compact List (padrão assimétrico)
Substituiu o antigo grid de 4 cards idênticos na home (`preview-grid`). Um destino primário (Projetos) vira um card maior — `preview-featured`, ícone 2.25rem, título 1.375rem, padding 2rem — ao lado de um único container (`preview-list`) que agrupa os destinos secundários como linhas internas (`preview-list-item`) separadas por hairline, não como cards repetidos. Em telas ≥640px é um grid `1.4fr 1fr`; abaixo disso empilha em coluna única, destaque primeiro.

### Named Rules
**The No-Repeat-Card Rule.** Quando 3+ destinos de mesmo nível precisam de um preview na home, pelo menos um deve receber tratamento visualmente diferente (destaque, lista compacta, ou composição assimétrica) — nunca N cards estruturalmente idênticos lado a lado.

### Navigation
- **Desktop:** links em Quiet Gray, sublinhado animado (`width: 0 → 100%`) em hover/active, texto vira Slate Ink no hover.
- **Mobile:** painel lateral (`translateX(100%)` → `0`, `min(85vw, 320px)`), overlay escuro com blur atrás; item ativo ganha fundo `--color-accent-soft` e uma borda esquerda de 4px na cor de acento.

### Header
- **Style:** sticky, fundo semi-transparente com `backdrop-filter: blur(12px)`, borda inferior hairline — só essa combinação usa glassmorphism no sistema, e é funcional (legibilidade sobre conteúdo que rola por baixo), não decorativa.

## 6. Do's and Don'ts

### Do:
- **Do** manter Signal Blue como a única cor com significado semântico — reservá-la para links, estado ativo e o botão primário (The One Accent Rule).
- **Do** comunicar hierarquia por peso tipográfico (400/600/800) antes de recorrer a cor ou tamanho.
- **Do** manter sombra em repouso plana; só intensificar em resposta a hover (The Hover-Earns-It Rule).
- **Do** usar movimento e efeitos de forma deliberada para enriquecer conteúdo real (transições de projeto, revelações), como definido em PRODUCT.md — não decoração aplicada por cima de um template.
- **Do** testar todo componente novo nos dois registros de tema (claro/escuro via classe `.dark`), já que todo token tem par definido.
- **Do** respeitar `prefers-reduced-motion` em qualquer animação nova (já implementado globalmente em `index.css`).

### Don't:
- **Don't** introduzir uma segunda cor de acento "porque combina" — quebra a regra de acento único que hoje dá foco ao Signal Blue.
- **Don't** empilhar o padrão de eyebrow (texto uppercase tracked) em toda seção nova — o sistema já usa isso em `hero-eyebrow`, `page-header .eyebrow` e `blog-tag`; adicionar mais reforça exatamente o clichê de IA-genérica que PRODUCT.md pede para evitar.
- **Don't** usar gradient text (`background-clip: text` com gradiente) para ênfase — PRODUCT.md marca clichês de landing de IA como anti-referência explícita; ênfase vem de peso, não de gradiente.
- **Don't** criar grades de cards idênticos (mesmo ícone + título + texto, repetido sem variação) — é o padrão de "card grid" que PRODUCT.md pede para evitar (ver The No-Repeat-Card Rule; a home já foi corrigida para o padrão destaque + lista compacta).
- **Don't** deixar uma seção nova estática/sem vida só porque "minimalista" — PRODUCT.md é explícito: minimalismo sem qualquer efeito ou animação é tão errado quanto excesso decorativo.
- **Don't** usar `border-left`/`border-right` colorido maior que 1px como indicador decorativo, exceto no item de nav mobile ativo, que já é a única exceção documentada do sistema.

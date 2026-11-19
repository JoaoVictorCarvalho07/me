# joao.dev() — design system v2 ("terminal/engenharia")

Substitui o sistema anterior (slate/azul, Inter). A fonte visual desta versão é o mockup terminal: fundo blueprint, âmbar como único destaque, mono para estrutura e sans para leitura.

## Tokens

Variáveis de dark e light em `app/tokens.css`. O tema claro entra com `data-theme="light"` no `<html>`. O terminal do hero usa tokens `--term-*` e fica escuro nos dois temas.

O Tailwind v4 lê essas variáveis em `app/globals.css` (`@theme inline`), então utilitários como `bg-raised`, `text-muted` e `font-mono` acompanham a troca de tema.

## Tipografia

- JetBrains Mono: títulos, navegação, badges, metadados e terminal. Ligaduras desligadas em código.
- IBM Plex Sans: texto corrido.

As duas vêm de `next/font`, nas variáveis `--font-jetbrains` e `--font-plex`.

## Tema

`next-themes` com `attribute="data-theme"`, `defaultTheme="dark"` e `enableSystem={false}`. O escuro é o padrão e não depende da preferência do sistema.

## Movimento

Digitação do terminal, cursor, ping de status e a barra `deploying sing...` respeitam `prefers-reduced-motion`. Sem JavaScript, o conteúdo do terminal já está no HTML.

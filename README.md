# joao.dev() — portfólio

Portfólio pessoal de **João Victor Carvalho**, desenvolvedor full-stack. O site é um export estático de Next.js, publicado no GitHub Pages em [joaovictorcarvalho07.github.io/me](https://joaovictorcarvalho07.github.io/me/).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4, com os tokens em `app/tokens.css`
- `next/font` (JetBrains Mono e IBM Plex Sans) e `next-themes` (escuro por padrão)
- Posts em Markdown (`content/posts`) com frontmatter tipado
- `output: 'export'` e `basePath: '/me'`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/me](http://localhost:3000/me).

```bash
npm run lint
npm run typecheck
npm run build
npm run link-check
```

O build gera a pasta `out/`.

## Rotas

| Rota | Origem |
| --- | --- |
| `/` | home |
| `/projetos/` | projetos |
| `/sobre/` | sobre |
| `/blog/` e `/blog/<slug>/` | blog |
| `/gostos/` | gostos |
| `/agora/` | agora |
| `/contato/` | contato |
| `/rss.xml` | feed |
| `/sitemap.xml` | sitemap |

Por enquanto só pt-BR. Os textos de interface ficam em `lib/i18n/pt-BR.ts`. Um segundo idioma entra como outro catálogo no mesmo formato.

## Novo post

1. Crie `content/posts/<slug>.md` com `title`, `desc`, `date`, `tag`, `readTime` e, se quiser, `thumb`.
2. Wikilinks `[[outro-slug]]` viram links para o post correspondente.
3. O build gera a rota, a metadata, a imagem OG, o sitemap e o RSS.

## GitHub Pages

O workflow (`.github/workflows/ci.yml`) roda lint, typecheck, build e link-check em todo pull request. **O deploy só acontece no push da `master`.** Enquanto esta branch não for mergeada, o site no ar não muda.

Para o Actions passar a publicar:

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, mude **Source** para **GitHub Actions**.
3. Faça o merge na `master`.

Se a fonte continuar sendo “Deploy from a branch”, o workflow de deploy não substitui os arquivos que estão no ar.

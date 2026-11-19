# joao.dev() — portfólio

Portfólio pessoal de **João Victor Carvalho**, desenvolvedor full-stack. O site é um export estático de Next.js, publicado no GitHub Pages na raiz de [jvcode.dev](https://jvcode.dev).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4, com os tokens em `app/tokens.css`
- `next/font` (JetBrains Mono e IBM Plex Sans) e `next-themes` (escuro por padrão)
- Posts em Markdown (`content/posts`) com frontmatter tipado
- `output: 'export'`, servido na raiz do domínio

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

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

## GitHub Pages e o domínio

O workflow (`.github/workflows/ci.yml`) roda lint, typecheck, build e link-check em todo pull request. **O deploy só acontece no push da `master`.**

A fonte do Pages precisa ser **GitHub Actions** (Settings → Pages → Build and deployment → Source). O artefato é a pasta `out/`, servida na raiz. `public/CNAME` entra nesse artefato com o conteúdo `jvcode.dev`.

No DNS de `jvcode.dev`, aponte o ápice para o GitHub Pages:

| Tipo | Valor |
| --- | --- |
| A | `185.199.108.153` |
| A | `185.199.109.153` |
| A | `185.199.110.153` |
| A | `185.199.111.153` |

Em Settings → Pages, o custom domain fica `jvcode.dev`. Depois que o DNS responder, marque **Enforce HTTPS**. O GitHub passa a servir o site em `https://jvcode.dev`. O endereço antigo `joaovictorcarvalho07.github.io/me` deixa de ser a URL canônica.

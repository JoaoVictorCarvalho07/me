# joao.dev() — portfólio

Portfólio pessoal e jardim digital de **João Victor Carvalho**, desenvolvedor Full-Stack e estudante de Sistemas de Informação na PUCPR.

🔗 **Site:** https://joaovictorcarvalho07.github.io/me/

## Stack

Site estático, sem build:

- HTML, CSS e JavaScript puro
- Posts do blog em Markdown (`content/posts`), renderizados no navegador com [marked](https://marked.js.org/) e com suporte a wikilinks do Obsidian
- Tema claro/escuro, menu mobile e filtro de projetos em JS
- Deploy no GitHub Pages

## Estrutura

```
index.html       # home
sobre.html       # sobre mim e skills
projetos.html    # projetos com filtro por tecnologia
blog.html        # lista de posts
post.html        # leitor de post (?slug=...)
gostos.html      # músicas, animes, filmes...
agora.html       # o que estou fazendo agora
contato.html     # contato
assets/css|js|img
content/posts/   # posts em Markdown
public/          # imagens do hero e dos projetos
DESIGN.md        # design system
PRODUCT.md       # público, propósito e tom
```

## Rodando localmente

Os posts são carregados via `fetch`, então use um servidor local:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Novo post

1. Crie `content/posts/<slug>.md`.
2. Adicione o `<slug>` na lista `postFiles` em `assets/js/blog.js`.

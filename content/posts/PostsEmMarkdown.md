---
tags:
  - blog
  - markdown
  - web-development
  - frontend
  - javascript
aliases:
  - Sistema de Blog Markdown
  - Renderização Markdown sem Backend
  - Fetch API Markdown
title: Sistema de Blog Markdown (Serverless/Static)
desc: Documentação da arquitetura e resolução de problemas ao carregar .md dinamicamente com JS puro
date: 26 Abr 2026
tag: JavaScript
readTime: 15 min
thumb: assets/img/blog/markdown-system.webp
---

---

## 🛠️ Stack Tecnológica

- **Engine de Markdown:** `Marked.js` (via CDN).
- **Linguagens:** [[HTML5]], [[CSS3]], [[JavaScript]] (ES6+).
- **Hospedagem:** GitHub Pages (Ambiente estático).

---

## ⏱️ Cronologia de Desafios e Soluções

### 🧩 Desafio 01: Renderização sem Backend

- **Problema:** Como exibir o conteúdo de um arquivo `.md` em uma página HTML sem usar Node.js ou linguagens de servidor?
- **Solução:** 
    1. Utilizar o método `fetch()` do [[JavaScript]] para buscar o conteúdo de texto do arquivo. 
    2. Passar esse texto pela biblioteca `marked.parse()`. 
    3. Injetar o HTML resultante em um container usando `.innerHTML`.

### 👻 Desafio 02: Arquivos não encontrados no GitHub Pages (Jekyll)

- **Problema:** O código funcionava perfeitamente no ambiente local (Live Server), mas retornava erro 404 após o deploy no GitHub.
- **Causa:** Por padrão, o GitHub Pages utiliza um processador chamado **Jekyll**. O Jekyll ignora ou tenta processar arquivos que começam com sublinhados ou pastas de conteúdo Markdown, fazendo com que os arquivos `.md` originais não fiquem acessíveis para o `fetch()`.
- **Solução:** Criar um arquivo vazio chamado `.nojekyll` na raiz do repositório. Isso força o GitHub a servir os arquivos exatamente como eles estão, permitindo que o [[JavaScript]] acesse os arquivos `.md` livremente.

---

## 💻 Implementação Técnica Atual (Snippet)

Abaixo o código central utilizando apenas `fetch` nativo:

```javascript
// Exemplo da lógica central
async function renderPost(slug) {
  try {
    // Busca o markdown na raiz do servidor
    const response = await fetch(`/content/posts/${slug}.md`);

    if (!response.ok) throw new Error("Post não encontrado");

    const markdown = await response.text();

    // Converte e injeta
    document.getElementById("post-container").innerHTML =
      marked.parse(markdown);
  } catch (err) {
    console.error("Erro crítico de carregamento:", err);
  }
}
```

// lista de arquivos
const postFiles = [
  "processo-seletivo-trainee",
  "jornada-vitasmile",
  "signals-vs-rxjs-angular",
  "deploy-aiven-chave-primaria",
  "conhecendo_hadoop",
  "rabbitmq_resiliencia",
  "sgs-cadi-projeto",
  "post-ia-estudos",
  "docker-ambiente-separado"
];

// 2. O Parser de Frontmatter (Regex que discutimos)
function parseMD(rawContent) {
  // Regex busca tudo o que está entre os primeiros ---
  const regex = /^---\s*([\s\S]*?)\s*---/;
  const match = regex.exec(rawContent);

  let metadata = {};
  let content = rawContent;

  if (match) {
    // Se achou o Frontmatter, processar os metadados
    const yamlBlock = match[1];
    // remove o bloco do conteúdo final
    content = rawContent.replace(regex, "").trim();

    yamlBlock.split("\n").forEach((line) => {
      const [key, ...val] = line.split(":");
      if (key && val.length) metadata[key.trim()] = val.join(":").trim();
    });
  }

  return { metadata, content };
}

// Quantos cards ficam "above the fold" (~primeira linha da grade).
// Suas capas usam priority fetching; o resto usa lazy loading nativo.
const EAGER_COUNT = 3;

function escapeAttr(text) {
  return String(text ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// Monta a <img> de capa com a estratégia de carregamento correta por posição.
// onerror remove a imagem se o arquivo faltar — a capa-gradiente atrás assume,
// sem layout shift (o container já tem aspect-ratio reservado).
function coverImg(thumb, eager) {
  if (!thumb) return "";
  const loading = eager
    ? 'fetchpriority="high" loading="eager"'
    : 'fetchpriority="low" loading="lazy"';
  return `<img src="${escapeAttr(thumb)}" alt="" ${loading} decoding="async" onerror="this.remove()">`;
}

// 3. Renderização
async function initBlog() {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  // Fetch em paralelo; Promise.all preserva a ordem do array postFiles.
  const posts = await Promise.all(
    postFiles.map(async (slug) => {
      try {
        const response = await fetch(`./content/posts/${slug}.md`);
        if (!response.ok) return null;
        const text = await response.text();
        return { slug, metadata: parseMD(text).metadata };
      } catch {
        return null;
      }
    }),
  );

  const fragment = document.createDocumentFragment();

  posts.forEach((post, index) => {
    if (!post) return;
    const { slug, metadata } = post;
    const tag = metadata.tag || "Geral";
    const eager = index < EAGER_COUNT;

    const card = document.createElement("article");
    card.className = "blog-card";
    card.innerHTML = `
      <a class="blog-card-link" href="post.html?slug=${encodeURIComponent(slug)}" aria-label="Ler o post: ${escapeAttr(metadata.title)}">
        <div class="blog-card-cover" data-tag="${escapeAttr(tag)}">${coverImg(metadata.thumb, eager)}</div>
        <div class="blog-card-body">
          <span class="blog-tag">${tag}</span>
          <h3 class="blog-card-title">${metadata.title || "Sem título"}</h3>
          <p class="blog-card-excerpt">${metadata.desc || ""}</p>
          <div class="blog-meta">
            <time>${metadata.date || ""}</time>
            <span>${metadata.readTime || "5 min"}</span>
          </div>
        </div>
      </a>
    `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  // Remove o empty-state se houver posts
  if (postFiles.length > 0) document.querySelector(".empty-state")?.remove();
}

document.addEventListener("DOMContentLoaded", initBlog);

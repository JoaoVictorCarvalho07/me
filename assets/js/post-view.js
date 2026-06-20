// Mapa de slugs: nome da nota no Obsidian -> slug do arquivo em content/posts.
// Só é preciso mapear quando os nomes diferem. Adicione novos casos aqui.
const WIKILINK_SLUG_MAP = {
  Hadoop: "conhecendo_hadoop",
  "blog-ia-estudos": "post-ia-estudos",
  "rabbitmq-resiliencia": "rabbitmq_resiliencia",
};

function resolveWikilinkSlug(target) {
  const clean = target.trim();
  return WIKILINK_SLUG_MAP[clean] || clean;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Extensão do marked: converte wikilinks do Obsidian em links internos do blog.
// Suporta: [[nota]], [[nota|texto]], [[nota#secao]] e [[nota#secao|texto]].
const wikilinkExtension = {
  name: "wikilink",
  level: "inline",
  start(src) {
    return src.indexOf("[[");
  },
  tokenizer(src) {
    const match = /^\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/.exec(src);
    if (!match) return;
    return {
      type: "wikilink",
      raw: match[0],
      target: match[1].trim(),
      label: (match[2] || match[1]).trim(),
    };
  },
  renderer(token) {
    const slug = resolveWikilinkSlug(token.target);
    const known = typeof postFiles !== "undefined" ? postFiles : [];
    const label = escapeHtml(token.label);
    // Se o alvo não é um post publicado, renderiza como texto (sem link quebrado).
    if (!known.includes(slug)) {
      return `<span class="wikilink-missing">${label}</span>`;
    }
    return `<a class="wikilink" href="post.html?slug=${encodeURIComponent(slug)}">${label}</a>`;
  },
};

let markedConfigured = false;
function configureMarked() {
  if (markedConfigured) return;
  marked.use({ extensions: [wikilinkExtension] });
  markedConfigured = true;
}

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    window.location.href = "blog.html";
    return;
  }

  try {
    const response = await fetch(`./content/posts/${slug}.md`);
    if (!response.ok) throw new Error("Post não encontrado");

    const raw = await response.text();

    // parser de Frontmatter
    const { metadata, content } = parseMD(raw);

    // Preenche o HTML
    document.title = `${metadata.title} — João Victor`;
    document.getElementById("post-title").innerText = metadata.title;
    document.getElementById("post-date").innerText = metadata.date;

    // Configura o parser (wikilinks) e renderiza o Markdown no container
    configureMarked();
    document.getElementById("post-content").innerHTML = marked.parse(content);
  } catch (error) {
    console.error(error);
    document.getElementById("post-content").innerHTML =
      "<p>Erro ao carregar o texto.</p>";

    alert(
      "Post não encontrado. Você será redirecionado para a página do blog.",
    );
    setTimeout(() => {
      window.location.href = "blog.html";
    }, 2000);
  }
}
document.addEventListener("DOMContentLoaded", loadPost);

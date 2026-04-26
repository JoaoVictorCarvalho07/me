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

    // Renderiza o Markdown no container
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

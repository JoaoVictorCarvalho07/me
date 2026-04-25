// assets/js/post-view.js
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

		// Usamos o seu parser de Frontmatter
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
	}
}

// Chame a função ao carregar a página
document.addEventListener("DOMContentLoaded", loadPost);

// todo: "ver se o showdown é necessário ou se o marked já resolve tudo, para evitar ter 2 libs de markdown no projeto.";
// todo: "ajustar a estilização do md pois esta vindo como texto";

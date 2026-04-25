// assets/js/blog.js

// 1. Sua lista de arquivos (o único lugar manual)
const postFiles = ["refatoracao-performance-java", "formulários","refatoracao-performance-java copy"];

// 2. O Parser de Frontmatter (Regex que discutimos)
function parseMD(rawContent) {
	// Esse Regex busca tudo o que está entre os primeiros ---
	const regex = /^---\s*([\s\S]*?)\s*---/;
	const match = regex.exec(rawContent);

	let metadata = {};
	let content = rawContent;

	if (match) {
		// Se achou o Frontmatter, vamos processar os metadados
		const yamlBlock = match[1];
		// E aqui removemos o bloco do conteúdo final
		content = rawContent.replace(regex, "").trim();

		yamlBlock.split("\n").forEach((line) => {
			const [key, ...val] = line.split(":");
			if (key && val.length) metadata[key.trim()] = val.join(":").trim();
		});
	}

	return { metadata, content };
}

// 3. Renderização
async function initBlog() {
	const grid = document.getElementById("blog-grid");
	if (!grid) return;

	for (const slug of postFiles) {
		const response = await fetch(`./content/posts/${slug}.md`);
		const text = await response.text();
		const { metadata } = parseMD(text);

		const card = document.createElement("article");
		card.className = "blog-card";
		card.innerHTML = `
            <span class="blog-tag">${metadata.tag || "Geral"}</span>
            <h3><a href="post.html?slug=${slug}">${metadata.title}</a></h3>
            <p>${metadata.desc}</p>
            <div class="blog-meta">
                <time>${metadata.date}</time>
                <span>${metadata.readTime || "5 min"}</span>
            </div>
        `;
		grid.appendChild(card);
	}

	// Remove o empty-state se houver posts
	if (postFiles.length > 0) document.querySelector(".empty-state")?.remove();
}

document.addEventListener("DOMContentLoaded", initBlog);

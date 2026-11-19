import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site.url}/blog/${post.slug}/</link>
      <guid>${site.url}/blog/${post.slug}/</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.desc)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>joao.dev() · blog</title>
    <link>${site.url}/blog/</link>
    <description>Notas de João Victor Carvalho.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

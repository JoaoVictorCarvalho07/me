import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Capa do post";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "joao.dev()";
  const kicker = post ? `${post.tag} · ${post.dateLabel}` : "blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0B0D10",
          color: "#E7E9EE",
          padding: "72px",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div style={{ display: "flex", color: "#FFB547", fontSize: 28 }}>joao.dev()</div>
        <div style={{ display: "flex", marginTop: 48, color: "#9BA3B1", fontSize: 24 }}>{kicker}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 56, lineHeight: 1.15, letterSpacing: -1, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#5BD08A", fontSize: 24 }}>$ cat ~/blog/{slug}.md</div>
      </div>
    ),
    size,
  );
}

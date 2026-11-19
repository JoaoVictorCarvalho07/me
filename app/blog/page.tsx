import type { Metadata } from "next";
import Link from "next/link";
import { asset, site } from "@/lib/site";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas de João Victor Carvalho sobre backend, frontend, devops e projetos.",
  alternates: {
    canonical: "/blog/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: { url: `${site.url}/blog/` },
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">tail</span>
          <h1 className="page-title">blog</h1>
          <code className="sec-cmd">
            <b>$</b> ls ~/blog
          </code>
          <p className="sec-sub">
            {posts.length} notas. O feed fica em{" "}
            <a href={asset("/rss.xml")} style={{ color: "var(--secondary)" }}>
              rss.xml
            </a>
            .
          </p>
        </header>
        <div className="posts">
          {posts.map((post) => (
            <Link key={post.slug} className="post" href={`/blog/${post.slug}/`}>
              <time dateTime={post.iso}>{post.dateLabel}</time>
              <span className="tag">
                <span className="badge">{post.tag}</span>
              </span>
              <h3>
                {post.title}
                <span className="desc">{post.desc}</span>
              </h3>
              <span className="rt">
                {post.readTime}
                <span className="arr">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

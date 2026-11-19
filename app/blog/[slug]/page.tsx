import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { asset, site } from "@/lib/site";
import { getPost, getPosts } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.desc,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      url: `${site.url}/blog/${post.slug}/`,
      title: post.title,
      description: post.desc,
      publishedTime: post.iso,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
      images: [`/blog/${post.slug}/opengraph-image.png`],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="page">
      <article className="container">
        <header className="sec-head">
          <span className="sec-idx">{post.tag}</span>
          <h1 className="page-title" style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <code className="sec-cmd">
            <b>$</b> cat {post.slug}.md
          </code>
        </header>
        <p className="page-lead">{post.desc}</p>
        <div className="meta-row">
          <time dateTime={post.iso}>{post.dateLabel}</time>
          <span>{post.readTime}</span>
          <Link href="/blog/">← blog</Link>
        </div>
        {post.thumb ? (
          <div className="blog-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(post.thumb)} alt="" />
          </div>
        ) : null}
        <Markdown source={post.body} />
      </article>
    </main>
  );
}

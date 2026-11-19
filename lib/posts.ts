import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { formatPostDate, isoDate, parsePostDate } from "./dates";

export type PostFrontmatter = {
  title: string;
  desc: string;
  date: string;
  tag: string;
  readTime: string;
  thumb?: string;
  tags?: string[];
  aliases?: string[];
};

export type Post = {
  slug: string;
  title: string;
  desc: string;
  date: Date;
  dateLabel: string;
  iso: string;
  tag: string;
  readTime: string;
  thumb?: string;
  body: string;
};

const DIR = path.join(process.cwd(), "content/posts");

const preferred = [
  "processo-seletivo-trainee",
  "jornada-vitasmile",
  "deploy-aiven-chave-primaria",
  "signals-vs-rxjs-angular",
  "docker-ambiente-separado",
  "conhecendo_hadoop",
  "rabbitmq_resiliencia",
  "sgs-cadi-projeto",
  "post-ia-estudos",
];

function linkWikilinks(markdown: string, titles: Map<string, string>): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_match, slug: string) => {
    const label = titles.get(slug) ?? slug;
    return `[${label}](/blog/${slug}/)`;
  });
}

let cache: Post[] | null = null;

export function getPosts(): Post[] {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((file) => file.endsWith(".md"));
  const drafts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const parsed = matter(raw);
    const data = parsed.data as PostFrontmatter;
    const head = raw.split("\n").slice(0, 40).join("\n");
    const dateRaw = /^date:\s*(.+)$/m.exec(head)?.[1]?.trim().replace(/^["']|["']$/g, "");
    if (!data.title || !data.desc || !dateRaw || !data.tag || !data.readTime) {
      throw new Error(`Frontmatter incompleto em ${file}`);
    }
    const date = parsePostDate(dateRaw);
    return {
      slug,
      title: data.title,
      desc: data.desc,
      date,
      dateLabel: formatPostDate(date),
      iso: isoDate(date),
      tag: data.tag,
      readTime: data.readTime,
      thumb: data.thumb,
      body: parsed.content.trim(),
    } satisfies Post;
  });

  const titles = new Map(drafts.map((post) => [post.slug, post.title]));
  const posts = drafts
    .map((post) => ({ ...post, body: linkWikilinks(post.body, titles) }))
    .sort((a, b) => {
      const byDate = b.date.getTime() - a.date.getTime();
      if (byDate !== 0) return byDate;
      const ai = preferred.indexOf(a.slug);
      const bi = preferred.indexOf(b.slug);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

  cache = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function recentPosts(count = 4): Post[] {
  return getPosts().slice(0, count);
}

import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projetos/", "/sobre/", "/blog/", "/gostos/", "/agora/", "/contato/"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const posts = getPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}

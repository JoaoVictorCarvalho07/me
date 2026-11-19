export const site = {
  name: "João Victor Carvalho",
  title: "João Victor Carvalho · Dev Full-Stack",
  description:
    "Portfólio do João Victor Carvalho: desenvolvedor full-stack com foco em backend. NestJS, Next.js, PostgreSQL, Docker, AWS/EKS e Go.",
  url: "https://jvcode.dev",
  locale: "pt-BR" as const,
  email: "jvcarvalho018@gmail.com",
  github: "https://github.com/JoaoVictorCarvalho07",
  linkedin: "https://www.linkedin.com/in/joao-victor-carvalho-de-freitas/",
  whatsapp: "https://wa.me/5592981920847",
  instagram: "https://instagram.com/jventediado",
  ogImage: "/images/og/og-image.png",
} as const;

export function asset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

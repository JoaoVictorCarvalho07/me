export type BadgeTone = "default" | "accent" | "info";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  window: string;
  summary: string;
  status: string;
  tone: "ok" | "warn" | "info" | "idle";
  live?: boolean;
  stack: { label: string; tone?: BadgeTone }[];
  links: ProjectLink[];
  featured: boolean;
  /** home | página de projetos */
  home: "teaser" | "card" | "log" | "hidden";
  span: "2" | "3" | "6";
  filters: string[];
  level?: string;
  image?: string;
};

const gh = "https://github.com/JoaoVictorCarvalho07";

export const projects: Project[] = [
  {
    // TODO: quando o sing puder aparecer, revisar este teaser.
    // Sem link de case study, sem nota e sem citar EKS. O repo público não entra no card.
    slug: "sing",
    title: "sing",
    window: "sing",
    summary:
      "Tem um projeto novo no forno. O terminal já começou o deploy; o diagrama continua fechado.",
    status: "em andamento",
    tone: "warn",
    stack: [{ label: "em breve", tone: "accent" }],
    links: [],
    featured: true,
    home: "teaser",
    span: "6",
    filters: ["em breve"],
  },
  {
    slug: "vitasmile",
    title: "VitaSmile",
    window: "vitasmile",
    summary:
      "Gestão de consultas odontológicas de ponta a ponta: login com perfis (admin, dentista, paciente), agendamento, cadastros e relatórios financeiros. Feito no programa de trainee, do modelo de dados ao deploy.",
    status: "concluído",
    tone: "ok",
    stack: [
      { label: "Spring Boot", tone: "accent" },
      { label: "Angular" },
      { label: "MySQL" },
      { label: "JWT" },
    ],
    links: [
      { label: "ler a jornada →", href: "/blog/jornada-vitasmile/" },
      { label: "repo ↗", href: `${gh}/vitasmile` },
      { label: "frontend ↗", href: `${gh}/vitasmile-frontend` },
    ],
    featured: true,
    home: "card",
    span: "2",
    filters: ["java", "frontend"],
  },
  {
    slug: "nasa-explorer",
    title: "nasa-explorer",
    window: "nasa-explorer",
    summary:
      "App React Native + Expo em TypeScript sobre a API de imagens da NASA, com login e favoritos no Supabase (RLS). Somativo de Desenvolvimento Mobile Híbrido na PUCPR.",
    status: "mobile",
    tone: "info",
    stack: [
      { label: "React Native", tone: "accent" },
      { label: "Expo" },
      { label: "TypeScript" },
      { label: "Supabase" },
    ],
    links: [{ label: "repo ↗", href: `${gh}/nasa-explorer` }],
    featured: true,
    home: "card",
    span: "2",
    filters: ["mobile", "react"],
  },
  {
    slug: "dp-projeto-final-docs",
    title: "dp-projeto-final-docs",
    window: "dp-projeto-final-docs",
    summary:
      "Biblioteca Java 21 publicada no JitPack para montar documentos e exportar em HTML, Markdown e texto, com 8 design patterns. Trabalho em grupo na PUCPR.",
    status: "lib",
    tone: "ok",
    stack: [
      { label: "Java 21", tone: "accent" },
      { label: "JitPack" },
      { label: "Gradle" },
    ],
    links: [
      { label: "repo ↗", href: `${gh}/dp-projeto-final-docs` },
      { label: "jitpack ↗", href: "https://jitpack.io/#JoaoVictorCarvalho07/dp-projeto-final-docs" },
    ],
    featured: true,
    home: "card",
    span: "2",
    filters: ["java"],
  },
  {
    slug: "api-dados-abertos-saude",
    title: "Dengue 2026: quem interna?",
    window: "api-dados-abertos-saude",
    summary:
      "Análise das notificações de dengue de 2026 (Sinan, dados abertos do SUS) e um modelo de regressão logística para hospitalização. Trabalho em grupo na PUCPR.",
    status: "dados + ML",
    tone: "info",
    stack: [
      { label: "Python", tone: "accent" },
      { label: "pandas" },
      { label: "scikit-learn" },
      { label: "matplotlib" },
    ],
    links: [{ label: "repo ↗", href: `${gh}/api-dados-abertos-saude` }],
    featured: true,
    home: "card",
    span: "3",
    filters: ["dados"],
  },
  {
    slug: "site-isabel-pontes",
    title: "Site Isabel Pontes",
    window: "site-isabel-pontes",
    summary:
      "Site para uma cliente real, fotógrafa e criadora de conteúdo, com páginas de sobre, contato e galeria. Refatorado em Next.js e no ar.",
    status: "cliente real",
    tone: "ok",
    live: true,
    stack: [
      { label: "Next.js", tone: "accent" },
      { label: "TypeScript" },
      { label: "React" },
    ],
    links: [
      { label: "site ↗", href: "https://isabelpontes.com.br" },
      {
        label: "repo ↗",
        href: `${gh}/site-isabel-pontes/tree/reescrita-next`,
      },
    ],
    // TODO: trocar o trecho de código por um print da versão Next.js. O webp antigo era o site em Go/HTMX.
    featured: true,
    home: "card",
    span: "3",
    filters: ["frontend", "react"],
  },
  {
    slug: "todo-app",
    title: "TODO App",
    window: "todo_app",
    summary: "Lista de tarefas com adicionar, editar, excluir e marcar como concluída. Código em TypeScript.",
    status: "estudo",
    tone: "idle",
    level: "[web]",
    stack: [{ label: "React" }, { label: "TypeScript" }, { label: "Tailwind" }],
    links: [{ label: "repo ↗", href: `${gh}/todo_app` }],
    featured: false,
    home: "log",
    span: "2",
    filters: ["react", "frontend"],
    image: "/images/projects/todo.webp",
  },
  {
    slug: "nucleo",
    title: "Núcleo",
    window: "nucleo",
    summary:
      "App de gerenciamento de finanças. Projeto acadêmico com API REST em Spring Boot (Java 17, JWT, MySQL) e app Android em Kotlin com Jetpack Compose.",
    status: "acadêmico",
    tone: "ok",
    level: "[mobile]",
    stack: [
      { label: "Kotlin" },
      { label: "Jetpack Compose" },
      { label: "Java" },
      { label: "Spring Boot" },
      { label: "JWT" },
      { label: "MySQL" },
    ],
    links: [
      { label: "backend ↗", href: `${gh}/nucleo_backend` },
      { label: "android ↗", href: `${gh}/nucleo_android` },
    ],
    featured: false,
    home: "log",
    span: "2",
    filters: ["java", "mobile"],
  },
  {
    slug: "midiakit",
    title: "Mídia Kit UGC",
    window: "midiakit",
    summary: "Portfólio dinâmico para criadores de conteúdo UGC. Arquivos salvos no Cloudflare R2.",
    status: "freela",
    tone: "ok",
    level: "[web]",
    stack: [{ label: "JavaScript" }, { label: "Cloudflare R2" }],
    // TODO: o host público do mídia kit não resolve. Ficou só o repositório.
    links: [{ label: "repo ↗", href: `${gh}/Midiakit_isabelPontes` }],
    featured: false,
    home: "log",
    span: "2",
    filters: ["frontend"],
    image: "/images/projects/midiakit.webp",
  },
  {
    slug: "portfolio-paulo",
    title: "Portfólio Paulo Ricardo",
    window: "portfolio-paulo",
    summary:
      "Portfólio digital de um arquiteto e urbanista, com timeline de carreira, grade de projetos e acervo de publicações acadêmicas.",
    status: "no ar",
    tone: "ok",
    live: true,
    level: "[web]",
    stack: [
      { label: "React" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "Vite" },
    ],
    // TODO: o repositório no GitHub responde 404. Ficou só o site na Vercel.
    links: [{ label: "site ↗", href: "https://portfolio-paulo-neon.vercel.app/" }],
    featured: false,
    home: "log",
    span: "2",
    filters: ["react", "frontend"],
    image: "/images/projects/paulo.webp",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const logProjects = projects.filter((project) => project.home === "log");

export const projectFilters = [
  { id: "todos", label: "todos" },
  { id: "java", label: "java" },
  { id: "react", label: "react" },
  { id: "frontend", label: "frontend" },
  { id: "mobile", label: "mobile" },
  { id: "dados", label: "dados" },
] as const;

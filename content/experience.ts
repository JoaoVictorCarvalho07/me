export type ExperienceItem = {
  head?: boolean;
  init?: boolean;
  ref?: string;
  type: string;
  when: string;
  title: string;
  body: string;
  badges?: string[];
};

/**
 * A experiência atual é só "Desenvolvedor de software".
 * Não citar empresa nem os projetos dela.
 */
export const experience: ExperienceItem[] = [
  {
    head: true,
    ref: "HEAD → main",
    type: "feat(carreira)",
    when: "2024 → hoje",
    title: "Desenvolvedor de software",
    body: "Landing pages, integrações REST, painéis administrativos e portfólios para criadores de conteúdo.",
  },
  {
    type: "feat(carreira)",
    when: "2026",
    title: "Programa de trainee: Java/Spring Boot + Angular",
    body: "Cursos nas duas frentes e mentoria diária. Entreguei o VitaSmile do zero ao deploy como projeto final.",
    badges: ["Spring Boot", "Angular", "MySQL"],
  },
  {
    type: "feat(acadêmico)",
    when: "2024",
    title: "Projeto acadêmico: app Núcleo",
    body: "API REST com Spring Boot e app Android em Kotlin com Jetpack Compose para gerenciamento de finanças pessoais.",
  },
  {
    type: "chore(estudos)",
    when: "2024 → 2027",
    title: "Sistemas de Informação, PUCPR",
    body: "Graduação com foco em desenvolvimento de software, estrutura de dados e arquitetura de sistemas.",
  },
  {
    init: true,
    type: "init",
    when: "Boa Vista → Manaus → Curitiba",
    title: "initial commit",
    body: "Curiosidade por como as coisas funcionam por trás das telas.",
  },
];

export const stackGroups = [
  {
    id: "backend",
    index: "01",
    text: "APIs, mensageria e regra de negócio.",
    items: [
      { label: "NestJS", tone: "accent" as const },
      { label: "Node.js", tone: "accent" as const },
      { label: "RabbitMQ", tone: "accent" as const },
      { label: "Java · Spring Boot" },
      { label: "Go" },
      { label: "Express" },
      { label: "REST" },
      { label: "JWT" },
    ],
  },
  {
    id: "frontend",
    index: "02",
    text: "Interfaces rápidas e acessíveis.",
    items: [
      { label: "Next.js", tone: "accent" as const },
      { label: "TypeScript", tone: "accent" as const },
      { label: "React" },
      { label: "Angular" },
      { label: "HTMX" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    id: "dados",
    index: "03",
    text: "Modelagem, consultas e análise.",
    items: [
      { label: "PostgreSQL", tone: "accent" as const },
      { label: "MySQL" },
      { label: "MongoDB" },
      { label: "Supabase" },
      { label: "Python · pandas" },
    ],
  },
  {
    id: "infra",
    index: "04",
    text: "Do container ao cluster.",
    items: [
      { label: "Docker", tone: "accent" as const },
      { label: "AWS · EKS", tone: "info" as const },
      { label: "Linux" },
      { label: "Git / GitHub" },
      { label: "Cloudflare R2" },
    ],
  },
];

export const skillGroups = [
  {
    title: "Linguagens & frameworks",
    items: [
      "Java",
      "Spring Boot",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Next.js",
      "React",
      "Express",
      "Angular",
      "Kotlin",
      "Jetpack Compose",
      "HTML / CSS",
      "Go",
    ],
  },
  {
    title: "Banco, DevOps & outros",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Docker",
      "RabbitMQ",
      "Git / GitHub",
      "REST APIs",
      "JWT Auth",
      "Tailwind CSS",
      "Linux",
      "Cloudflare R2",
    ],
  },
];

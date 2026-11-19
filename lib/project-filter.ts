import type { Project } from "@/content/projects";

/** Seleção vazia mostra tudo. Com tags, entra quem tiver qualquer uma delas. */
export function filterProjects(projects: readonly Project[], selected: readonly string[]): Project[] {
  const tags = selected.filter((tag) => tag && tag !== "todos");
  if (tags.length === 0) return [...projects];
  return projects.filter((project) => tags.some((tag) => project.filters.includes(tag)));
}

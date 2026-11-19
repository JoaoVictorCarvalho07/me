"use client";

import { useMemo, useState } from "react";
import { projectFilters, type Project } from "@/content/projects";
import { filterProjects } from "@/lib/project-filter";
import { ProjectCard, SingTeaser } from "./project-cards";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const visible = useMemo(() => filterProjects(projects, selected), [projects, selected]);

  function toggle(id: string) {
    if (id === "todos") {
      setSelected([]);
      return;
    }
    setSelected((current) => (current.includes(id) ? current.filter((tag) => tag !== id) : [...current, id]));
  }

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filtrar projetos">
        {projectFilters.map((item) => {
          const pressed = item.id === "todos" ? selected.length === 0 : selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`btn btn--sm${pressed ? " is-on" : ""}`}
              aria-pressed={pressed}
              onClick={() => toggle(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="proj">
        {visible.map((project) =>
          project.slug === "sing" ? (
            <SingTeaser key={project.slug} />
          ) : (
            <ProjectCard key={project.slug} project={project} span={project.slug === "sing" ? "6" : "3"} />
          ),
        )}
      </div>
      {visible.length === 0 ? <p className="page-lead">Nenhum projeto com esse filtro.</p> : null}
    </>
  );
}

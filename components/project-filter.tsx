"use client";

import { useMemo, useState } from "react";
import { projectFilters, type Project } from "@/content/projects";
import { ProjectCard, SingTeaser } from "./project-cards";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("todos");
  const visible = useMemo(
    () => (filter === "todos" ? projects : projects.filter((project) => project.filters.includes(filter))),
    [filter, projects],
  );

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filtrar projetos">
        {projectFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`btn btn--sm${filter === item.id ? " is-on" : ""}`}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="proj">
        {visible.map((project) =>
          project.slug === "sing" ? <SingTeaser key={project.slug} /> : <ProjectCard key={project.slug} project={project} span={project.slug === "sing" ? "6" : "3"} />,
        )}
      </div>
      {visible.length === 0 ? <p className="page-lead">Nenhum projeto com esse filtro.</p> : null}
    </>
  );
}

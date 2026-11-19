import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos de João Victor Carvalho: sistemas, bibliotecas, apps e sites no ar.",
  alternates: { canonical: "/projetos/" },
  openGraph: { url: `${site.url}/projetos/` },
};

export default function ProjetosPage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">ls</span>
          <h1 className="page-title">projetos</h1>
          <code className="sec-cmd">
            <b>$</b> ls ~/projetos
          </code>
          <p className="sec-sub">Do modelo de dados ao deploy. O sing ainda está fechado.</p>
        </header>
        <ProjectFilter projects={projects} />
      </div>
    </main>
  );
}

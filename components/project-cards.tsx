import Link from "next/link";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/site";

function Lights() {
  return (
    <span className="win__lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Status({ project }: { project: Project }) {
  return (
    <span className="status">
      <span className={`dot dot--${project.tone}${project.live ? " dot--live" : ""}`} aria-hidden="true" />
      {project.status}
    </span>
  );
}

function Badges({ project }: { project: Project }) {
  return (
    <div className="badges">
      {project.stack.map((item) => (
        <span key={item.label} className={`badge${item.tone ? ` badge--${item.tone}` : ""}`}>
          {item.label}
        </span>
      ))}
    </div>
  );
}

function Links({ project, limit }: { project: Project; limit?: number }) {
  const links = limit ? project.links.slice(0, limit) : project.links;
  if (links.length === 0) return null;
  return (
    <div className="p-links">
      {links.map((link) =>
        link.href.startsWith("/") ? (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ) : (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ),
      )}
    </div>
  );
}

function RedactedDiagram() {
  return (
    <figure className="p-diagram">
      <div className="redact">
        <svg className="dg" viewBox="0 0 520 300" role="img" aria-label="Diagrama de arquitetura redigido">
          <rect className="bound" x="8" y="58" width="504" height="234" rx="8" />
          <text className="ta" x="22" y="78">
            REDACTED
          </text>
          <rect className="box" x="200" y="8" width="120" height="30" rx="5" />
          <path className="ln" d="M260 38 V92" />
          <rect className="box-acc" x="180" y="92" width="160" height="34" rx="5" />
          <path className="ln" d="M260 126 V146 M80 146 H440 M80 146 V162 M260 146 V162 M440 146 V162" />
          <rect className="box" x="22" y="162" width="116" height="40" rx="5" />
          <rect className="box" x="202" y="162" width="116" height="40" rx="5" />
          <rect className="box" x="382" y="162" width="116" height="40" rx="5" />
          <path className="ln-acc" d="M80 202 V222 M260 202 V222 M440 202 V222 M40 222 H480" />
          <path className="ln" d="M80 222 V246 M260 222 V246 M440 222 V246" />
          <rect className="box-info" x="32" y="246" width="96" height="32" rx="5" />
          <rect className="box-info" x="196" y="246" width="128" height="32" rx="5" />
          <rect className="box-info" x="392" y="246" width="96" height="32" rx="5" />
        </svg>
        <div className="stamp">redacted</div>
      </div>
      <figcaption>fig. 1 · arquitetura ainda fechada</figcaption>
    </figure>
  );
}

function Artifact({ project }: { project: Project }) {
  if (project.slug === "vitasmile") {
    return (
      <pre className="snip">
        <span className="c">{"// valor no item, não na consulta\n"}</span>
        <span className="k">ConsultaProcedimento</span>
        {" { procedimento, "}
        <span className="s">valor</span>
        {" }"}
      </pre>
    );
  }
  if (project.slug === "nasa-explorer") {
    return (
      <pre className="snip">
        <span className="c">{"// NASA Image and Video Library\n"}</span>
        <span className="k">GET</span> <span className="s">/search</span>
        {"\nfavoritos  →  supabase (RLS)"}
      </pre>
    );
  }
  if (project.slug === "dp-projeto-final-docs") {
    return (
      <pre className="snip">
        <span className="c">{"// JitPack · v1.1.0\n"}</span>
        <span className="k">com.github.JoaoVictorCarvalho07</span>
        {"\n:dp-projeto-final-docs:v1.1.0"}
      </pre>
    );
  }
  if (project.slug === "api-dados-abertos-saude") {
    return (
      <dl className="readout">
        <div>
          <dt>registros</dt>
          <dd>470.451</dd>
        </div>
        <div>
          <dt>AUC</dt>
          <dd>0,75</dd>
        </div>
        <div>
          <dt>recall</dt>
          <dd>0,67</dd>
        </div>
      </dl>
    );
  }
  if (project.slug === "site-isabel-pontes") {
    return (
      <pre className="snip">
        <span className="c">{"// branch reescrita-next\n"}</span>
        <span className="k">live</span> <span className="s">isabelpontes.com.br</span>
        {"\n"}
        <span className="k">stack</span> Next.js
      </pre>
    );
  }
  if (project.image) {
    return (
      <div className="shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(project.image)} alt="" />
      </div>
    );
  }
  return null;
}

export function SingTeaser() {
  const project = {
    slug: "sing",
    title: "sing",
    window: "sing",
    summary: "Tem um projeto novo no forno. O terminal já começou o deploy; o diagrama continua fechado.",
    status: "em andamento",
    tone: "warn" as const,
    stack: [{ label: "em breve", tone: "accent" as const }],
    links: [],
    featured: true,
    home: "teaser" as const,
    span: "6" as const,
    filters: [],
  };
  return (
    <article className="win p-card span-6" data-reveal id="sing">
      <div className="win__bar">
        <Lights />
        <span className="win__path">
          ~/projetos/<b>sing</b>
        </span>
        <Status project={project} />
      </div>
      <div className="p-wide">
        <div className="p-body">
          <h3>
            sing <span className="ver">em construção</span>
          </h3>
          <p>{project.summary}</p>
          <div className="snip deploy">
            <div>
              <span className="k">$</span> deploying sing...
            </div>
            <div
              className="deploy__track"
              role="progressbar"
              aria-label="Deploy do sing em andamento"
              aria-valuetext="em andamento"
            >
              <span className="deploy__fill" />
            </div>
          </div>
          <Badges project={project} />
        </div>
        <RedactedDiagram />
      </div>
    </article>
  );
}

export function ProjectCard({ project, span }: { project: Project; span?: Project["span"] }) {
  const column = span ?? project.span;
  return (
    <article className={`win win--hover p-card span-${column}`} data-reveal id={project.slug}>
      <div className="win__bar">
        <Lights />
        <span className="win__path">
          ~/projetos/<b>{project.window}</b>
        </span>
        <Status project={project} />
      </div>
      <div className="p-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <Artifact project={project} />
        <Badges project={project} />
        <div className="p-foot">
          <Links project={project} limit={2} />
        </div>
      </div>
    </article>
  );
}

export function ProjectLog({ projects }: { projects: Project[] }) {
  return (
    <div className="log" data-reveal>
      {projects.map((project) => {
        const href = project.links[0]?.href ?? `/projetos/#${project.slug}`;
        const inner = (
          <>
            <span className="lv">{project.level ?? "[proj]"}</span>
            <span className="nm">{project.title}</span>
            <span className="ds">{project.summary}</span>
            <span className="go">abrir ↗</span>
          </>
        );
        return href.startsWith("/") ? (
          <Link key={project.slug} className="log__row" href={href}>
            {inner}
          </Link>
        ) : (
          <a key={project.slug} className="log__row" href={href} target="_blank" rel="noreferrer">
            {inner}
          </a>
        );
      })}
    </div>
  );
}

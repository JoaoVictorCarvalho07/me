import Link from "next/link";
import { ContactBlock } from "@/components/contact-block";
import { GitLog } from "@/components/git-log";
import { ProjectCard, ProjectLog, SingTeaser } from "@/components/project-cards";
import { Terminal } from "@/components/terminal";
import { experience, stackGroups } from "@/content/experience";
import { featuredProjects, logProjects } from "@/content/projects";
import { m } from "@/lib/i18n";
import { recentPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const homeCards = featuredProjects.filter((project) => project.home === "card");

export default function HomePage() {
  const posts = recentPosts(4);
  return (
    <main id="main">
      <section className="hero" id="top">
        <div className="container">
          <div className="hero__grid">
            <div>
              <p className="hero__status">
                <span className="dot dot--ok dot--live" aria-hidden="true" />
                <b>{m.hero.status}</b>
                <span className="hs-extra"> · {m.hero.statusExtra}</span>
              </p>
              <h1 className="display">
                {m.hero.name1}
                <br />
                <span className="l2">{m.hero.name2}</span>
                <span className="cur" aria-hidden="true" />
              </h1>
              <p className="role">
                {m.hero.role}
                <span className="sep">{"//"}</span>
                <span className="dim">{m.hero.roleDim}</span>
              </p>
              <p className="lead">
                Construo produtos digitais performáticos e acessíveis, com carinho especial por backend e boas práticas. No dia a dia:{" "}
                <strong>NestJS</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, <strong>Docker</strong> e <strong>RabbitMQ</strong>. Também{" "}
                <strong>Java (Spring)</strong>, <strong>Go</strong> e <strong>AWS/EKS</strong>.
              </p>
              <div className="hero__cta">
                <Link className="btn btn--primary" href="/#projetos">
                  <span className="p">$</span> {m.hero.projects} <span className="arr">→</span>
                </Link>
                <Link className="btn" href="/contato/">
                  {m.hero.talk}
                </Link>
              </div>
              <nav className="links" aria-label="Redes">
                <a href={site.github} target="_blank" rel="noreferrer">
                  github <span>↗</span>
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  linkedin <span>↗</span>
                </a>
                <a href={`mailto:${site.email}`}>
                  email <span>↗</span>
                </a>
              </nav>
            </div>
            <Terminal />
          </div>
          <dl className="spec" data-reveal>
            {m.spec.map((item) => (
              <div key={item.k}>
                <dt>{item.k}</dt>
                <dd>{item.v}</dd>
              </div>
            ))}
            <div>
              <dt>rota</dt>
              <dd>
                Boa Vista <span className="ar">→</span> Manaus <span className="ar">→</span> Curitiba
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="projetos">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="sec-idx">01</span>
            <h2>{m.sections.projects}</h2>
            <code className="sec-cmd">
              <b>$</b> {m.sections.projectsCmd}
            </code>
            <p className="sec-sub">{m.sections.projectsSub}</p>
          </header>
          <div className="proj">
            <SingTeaser />
            {homeCards.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <ProjectLog projects={logProjects} />
          <div className="more">
            <a className="btn btn--ghost btn--sm" href={`${site.github}?tab=repositories`} target="_blank" rel="noreferrer">
              {m.allRepos} <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="stack">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="sec-idx">02</span>
            <h2>{m.sections.stack}</h2>
            <code className="sec-cmd">
              <b>$</b> {m.sections.stackCmd}
            </code>
            <p className="sec-sub">{m.sections.stackSub}</p>
          </header>
          <div className="stack">
            {stackGroups.map((group) => (
              <div className="win mod" data-reveal key={group.id}>
                <div className="win__bar">
                  <span className="win__path">
                    ~/stack/<b>{group.id}</b>
                  </span>
                  <span>{group.index}</span>
                </div>
                <div className="mod__body">
                  <p>{group.text}</p>
                  <div className="badges">
                    {group.items.map((item) => (
                      <span key={item.label} className={`badge${item.tone ? ` badge--${item.tone}` : ""}`}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="legend">
            <span>
              <i className="sw" />
              {m.legendDaily}
            </span>
            <span>
              <i className="sw sw--n" />
              {m.legendUsed}
            </span>
          </div>
        </div>
      </section>

      <section className="section" id="experiencia">
        <div className="container xp">
          <div className="xp__intro">
            <header className="sec-head" data-reveal style={{ marginBottom: "var(--space-6)" }}>
              <span className="sec-idx">03</span>
              <h2>{m.sections.xp}</h2>
            </header>
            <div data-reveal>
              <p>
                Vim de Boa Vista-RR, terminei o ensino médio em Manaus durante a pandemia, e foi ali que a programação virou refúgio. Aos 19 me mudei para Curitiba para a faculdade.
              </p>
              <p className="q">“Até hoje mantenho aquela sensação de encantamento quando um projeto sai do papel.”</p>
              <p>
                <code className="mono" style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                  <span style={{ color: "var(--ok)" }}>$</span> git log --graph carreira
                </code>
              </p>
            </div>
          </div>
          <GitLog items={experience} />
        </div>
      </section>

      <section className="section" id="blog">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="sec-idx">04</span>
            <h2>{m.sections.posts}</h2>
            <code className="sec-cmd">
              <b>$</b> {m.sections.postsCmd}
            </code>
          </header>
          <div className="posts" data-reveal>
            {posts.map((post) => (
              <Link key={post.slug} className="post" href={`/blog/${post.slug}/`}>
                <time dateTime={post.iso}>{post.dateLabel}</time>
                <span className="tag">
                  <span className="badge">{post.tag}</span>
                </span>
                <h3>
                  {post.title}
                  <span className="desc">{post.desc}</span>
                </h3>
                <span className="rt">
                  {post.readTime}
                  <span className="arr">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="more">
            <Link className="btn btn--ghost btn--sm" href="/blog/">
              {m.allPosts} <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="contato" style={{ paddingBottom: 0 }}>
        <div className="container">
          <ContactBlock />
        </div>
      </section>
    </main>
  );
}

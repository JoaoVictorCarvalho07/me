import type { Metadata } from "next";
import Link from "next/link";
import { GitLog } from "@/components/git-log";
import { experience, skillGroups } from "@/content/experience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem é João Victor Carvalho: desenvolvedor, estudante e curioso por natureza.",
  alternates: { canonical: "/sobre/" },
  openGraph: { url: `${site.url}/sobre/` },
};

export default function SobrePage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">whoami</span>
          <h1 className="page-title">sobre</h1>
          <code className="sec-cmd">
            <b>$</b> whoami --full
          </code>
          <p className="sec-sub">Desenvolvedor full-stack, estudante e curioso por natureza. Aqui você encontra quem sou de verdade, não só o dev.</p>
        </header>

        <div className="prose" data-reveal>
          <p>
            Vim de Boa Vista-RR, uma cidade pequena no extremo norte do Brasil. Desde cedo, sempre fui fascinado por tecnologia e como as coisas funcionam por trás das telas. Na adolescência, me mudei para Manaus-AM com minha mãe, onde terminei o ensino médio durante a pandemia. Nesse período de isolamento, a programação se tornou um refúgio e um hobby que me ajudou a passar o tempo e a aprender algo novo.
          </p>
          <p>
            Comecei a programar por curiosidade e fui ficando cada vez mais encantado com a capacidade de criar algo do nada. E até hoje ainda mantenho aquela sensação de encantamento quando um projeto sai do papel.
          </p>
          <p>
            Com 19 anos me mudei para Curitiba-PR e comecei a faculdade. Desde então, tenho me dedicado a aprender e crescer como desenvolvedor, explorando diferentes tecnologias e trabalhando em projetos pessoais e freelance para ganhar experiência prática.
          </p>
          <p>
            Sou estudante de <strong>Sistemas de Informação na PUCPR</strong>.
          </p>
          <p>
            Atualmente estudando <strong>arquiteturas limpas</strong>, <strong>google design</strong>, <strong>testes automatizados</strong>, <strong>estrutura de dados</strong>, <strong>Big Data</strong>, <strong>observabilidade</strong>, <strong>iOS development</strong> e como escalar sistemas sem perder a cabeça. Aberto a freelas, propostas e colaborações que façam sentido.
          </p>
        </div>

        <section className="section" aria-labelledby="skills-title">
          <h2 id="skills-title" className="page-title" style={{ marginBottom: "var(--space-5)" }}>
            skills
          </h2>
          <div className="stack stack--2">
            {skillGroups.map((group) => (
              <div className="win mod" key={group.title}>
                <div className="win__bar">
                  <span className="win__path">
                    ~/skills/<b>{group.title}</b>
                  </span>
                </div>
                <div className="mod__body">
                  <div className="badges">
                    {group.items.map((item) => (
                      <span className="badge" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="exp-title">
          <header className="sec-head">
            <span className="sec-idx">log</span>
            <h2 id="exp-title">experiência</h2>
            <code className="sec-cmd">
              <b>$</b> git log --graph carreira
            </code>
          </header>
          <GitLog items={experience} />
        </section>

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="cta">
            <span className="corner tl" aria-hidden="true" />
            <span className="corner br" aria-hidden="true" />
            <div>
              <h2>Quer trabalhar juntos?</h2>
              <p>Estou sempre aberto a projetos interessantes e novas colaborações.</p>
            </div>
            <div className="hero__cta" style={{ marginTop: 0 }}>
              <a className="btn btn--primary" href={`mailto:${site.email}`}>
                <span className="p">$</span> enviar e-mail
              </a>
              <Link className="btn" href="/projetos/">
                ver projetos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

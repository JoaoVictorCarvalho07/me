import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agora",
  description: "O que João Victor está fazendo, estudando e pensando agora.",
  alternates: { canonical: "/agora/" },
  openGraph: { url: `${site.url}/agora/` },
};

const cards = [
  {
    title: "Estudando",
    body: "Arquiteturas limpas (Clean Architecture, DDD), containerização com Docker e primeiros passos em observabilidade com logs e métricas.",
  },
  {
    title: "Construindo",
    body: "A imageColor, plataforma web para uma fotógrafa vender e entregar ensaios: galeria com marca d'água, seleção pela cliente, pagamento via Pix/cartão e entrega dos arquivos finais. Cobre a jornada da captação à entrega.",
    href: "https://github.com/JoaoVictorCarvalho07/imageColor",
    link: "repo ↗",
  },
  {
    title: "Faculdade",
    body: "Sistemas de Informação na PUCPR, entre 2024 e 2027.",
  },
  {
    title: "Lendo",
    body: "Clean Code (Robert C. Martin), revisitando os fundamentos para escrever código que outras pessoas conseguem entender.",
  },
  {
    title: "Pensando em",
    body: "Numa stack mais enxuta como próximo caminho: htmx, Go e SQLite. Menos JavaScript, mais simplicidade e performance.",
  },
];

const radar = [
  "Testes unitários (JUnit / Jest)",
  "CI/CD com GitHub Actions",
  "Event-driven (Kafka)",
  "Messages (RabbitMQ)",
  "TypeScript (avançado)",
  "System Design",
];

export default function AgoraPage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">now</span>
          <h1 className="page-title">agora</h1>
          <code className="sec-cmd">
            <b>$</b> cat ~/agora
          </code>
          <p className="sec-sub">
            Uma now page: snapshot da trajetória neste momento. Sem data cravada enquanto a página não for atualizada de novo.
          </p>
        </header>

        {/* TODO: confirmar com o João a data da última atualização. A página antiga dizia abril de 2025. */}
        {/* TODO: confirmar o período atual e o percentual da graduação. A página antiga dizia sexto período, cerca de 70%. */}

        <div className="stack stack--2">
          {cards.map((card) => (
            <article className="win mod" key={card.title} data-reveal>
              <div className="win__bar">
                <span className="win__path">
                  ~/agora/<b>{card.title.toLowerCase()}</b>
                </span>
              </div>
              <div className="mod__body">
                <h2 style={{ fontSize: "var(--text-xl)" }}>{card.title}</h2>
                <p>{card.body}</p>
                {card.href ? (
                  <div className="p-links">
                    <a href={card.href} target="_blank" rel="noreferrer">
                      {card.link}
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <section className="section" style={{ paddingBottom: 0 }} aria-labelledby="radar-title">
          <h2 id="radar-title" className="page-title" style={{ marginBottom: "var(--space-4)" }}>
            no radar
          </h2>
          <p className="page-lead" style={{ marginTop: 0, marginBottom: "var(--space-5)" }}>
            Tópicos que pretendo mergulhar.
          </p>
          <div className="badges">
            {radar.map((item) => (
              <span className="badge" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

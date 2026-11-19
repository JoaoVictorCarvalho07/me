import type { Metadata } from "next";
import { gostos } from "@/content/gostos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gostos",
  description: "O que alimenta o João fora do código: músicas, séries, leituras e ferramentas.",
  alternates: { canonical: "/gostos/" },
  openGraph: { url: `${site.url}/gostos/` },
};

export default function GostosPage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">~/</span>
          <h1 className="page-title">gostos</h1>
          <code className="sec-cmd">
            <b>$</b> ls ~/gostos
          </code>
          <p className="sec-sub">O que me alimenta fora do código: músicas, séries, leituras e coisas que influenciam como eu penso e crio.</p>
        </header>

        <div className="tastes">
          {gostos.map((group) => (
            <section key={group.id} aria-labelledby={group.id}>
              <h2 id={group.id} style={{ fontSize: "var(--text-2xl)" }}>
                {group.title}
              </h2>
              {group.genres ? (
                <div className="badges" style={{ marginTop: "var(--space-4)" }}>
                  {group.genres.map((genre) => (
                    <span className="badge" key={genre}>
                      {genre}
                    </span>
                  ))}
                </div>
              ) : null}
              {group.label ? (
                <p className="sec-sub" style={{ marginTop: "var(--space-4)" }}>
                  {group.label}
                </p>
              ) : null}
              <div className="taste-grid">
                {group.items.map((item) => {
                  const body = (
                    <>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt="" />
                      ) : (
                        <span className="ph" aria-hidden="true">
                          ·
                        </span>
                      )}
                      <span>
                        <b>{item.title}</b>
                        <small>{item.sub}</small>
                      </span>
                      {item.badge ? <span className="badge" style={{ marginLeft: "auto" }}>{item.badge}</span> : null}
                    </>
                  );
                  return item.href ? (
                    <a key={item.title} className="taste" href={item.href} target="_blank" rel="noreferrer">
                      {body}
                    </a>
                  ) : (
                    <div key={item.title} className="taste">
                      {body}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="note">
          <p>
            <strong>Nota pessoal:</strong> esta página vai crescendo com o tempo. Se você tem sugestões de música, livro ou série, manda mensagem no Instagram. Adoro descobrir coisas novas.
          </p>
          <div style={{ marginTop: "var(--space-4)" }}>
            <a className="btn btn--sm btn--primary" href={site.instagram} target="_blank" rel="noreferrer">
              instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

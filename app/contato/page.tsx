import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com João Victor Carvalho: e-mail, LinkedIn, GitHub e WhatsApp.",
  alternates: { canonical: "/contato/" },
  openGraph: { url: `${site.url}/contato/` },
};

export default function ContatoPage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <header className="sec-head">
          <span className="sec-idx">mail</span>
          <h1 className="page-title">contato</h1>
          <code className="sec-cmd">
            <b>$</b> mail joao
          </code>
          <p className="sec-sub">Aberto a freelas, colaborações, propostas e boas conversas sobre tecnologia. Escolha o canal que preferir.</p>
        </header>
        <p className="hero__status" style={{ marginBottom: "var(--space-6)" }}>
          <span className="dot dot--ok dot--live" aria-hidden="true" />
          <b>disponível para novos projetos</b>
        </p>
        <ContactBlock index="contato" />
        <p className="page-lead">
          Costumo responder em até <strong style={{ color: "var(--text)" }}>24h</strong>. Para assuntos profissionais, prefiro e-mail ou LinkedIn.
        </p>
      </div>
    </main>
  );
}

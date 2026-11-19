import { CopyEmail } from "./copy-email";
import { m } from "@/lib/i18n";
import { site } from "@/lib/site";

const channels = [
  { href: site.linkedin, label: "linkedin" },
  { href: site.github, label: "github" },
  { href: site.whatsapp, label: "whatsapp" },
  { href: site.instagram, label: "instagram" },
];

export function ContactBlock({ index = "05 · contato" }: { index?: string }) {
  return (
    <div className="cta" data-reveal>
      <span className="corner tl" aria-hidden="true" />
      <span className="corner br" aria-hidden="true" />
      <div>
        <span className="sec-idx">{index}</span>
        <h2 style={{ marginTop: "var(--space-4)" }}>
          {m.contactTitle}
          <span className="q">?</span>
        </h2>
        <p>{m.contactLead}</p>
        <div className="mail">
          <span className="ps2">$</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <CopyEmail />
        </div>
      </div>
      <nav className="channels" aria-label="Canais de contato">
        {channels.map((channel) => (
          <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer">
            <span>{channel.label}</span>
            <span>↗</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

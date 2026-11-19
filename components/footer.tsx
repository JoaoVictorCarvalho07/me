"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "@/lib/i18n";

function fileFor(pathname: string): string {
  if (pathname === "/") return "page.tsx";
  const slug = pathname.split("/").filter(Boolean);
  if (slug[0] === "blog" && slug[1]) return `${slug[1]}.md`;
  return `${slug[0] ?? "page"}.tsx`;
}

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="container foot__in">
        <span>
          © {year} João Victor Carvalho. {m.footer}
        </span>
        <nav aria-label="Rodapé">
          {m.footerNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="statusline">
        <span className="mode">NORMAL</span>
        <span>⎇ main</span>
        <span className="hide-sm">{fileFor(pathname)}</span>
        <span className="fill" />
        <span className="r hide-sm">{m.statusExample}</span>
        <span className="r">pt-BR · utf-8</span>
      </div>
    </footer>
  );
}

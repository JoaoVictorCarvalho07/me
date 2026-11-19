"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "@/lib/i18n";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  return (
    <header className={`nav${scrolled || open ? " scrolled" : ""}${open ? " open" : ""}`} id="nav">
      <div className="container nav__in">
        <Link href="/" className="logo" aria-label={m.logoLabel}>
          <span>joao.dev</span>
          <span className="fn">()</span>
          <span className="u" aria-hidden="true" />
        </Link>
        <ul className="nav__links" id="nav-links">
          {m.nav.map((item) => {
            const path = pathname.endsWith("/") || pathname === "/" ? pathname : `${pathname}/`;
            const current = !item.href.includes("#") && path === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={current ? "page" : undefined} onClick={() => setOpen(false)}>
                  <span className="sl">./</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="nav__tools">
          <button className="btn btn--sm cmdk" type="button" data-open-palette aria-label={m.searchLabel}>
            <span className="lbl">{m.search}</span>
            <kbd>⌘K</kbd>
          </button>
          <button
            className="btn btn--sm icon-btn"
            type="button"
            aria-label={m.themeLabel}
            onClick={toggleTheme}
            suppressHydrationWarning
          >
            <svg className="theme-ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            </svg>
            <svg className="theme-ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
          <button
            className="btn btn--sm icon-btn menu-btn"
            type="button"
            aria-label={open ? m.menuClose : m.menuOpen}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

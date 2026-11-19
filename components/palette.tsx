"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "@/lib/i18n";
import { site } from "@/lib/site";

type Item = {
  id: string;
  label: string;
  hint: string;
  href?: string;
  action?: "theme";
};

const items: Item[] = [
  { id: "projetos", label: "cd projetos", hint: "página", href: "/projetos/" },
  { id: "stack", label: "cat stack.lock", hint: "seção", href: "/#stack" },
  { id: "xp", label: "git log carreira", hint: "seção", href: "/#experiencia" },
  { id: "blog", label: "tail ~/blog", hint: "página", href: "/blog/" },
  { id: "sobre", label: "whoami --full", hint: "página", href: "/sobre/" },
  { id: "agora", label: "cat ~/agora", hint: "página", href: "/agora/" },
  { id: "gostos", label: "ls ~/gostos", hint: "página", href: "/gostos/" },
  { id: "contato", label: "mail joao", hint: "contato", href: "/contato/" },
  { id: "github", label: "open github", hint: "link", href: site.github },
  { id: "linkedin", label: "open linkedin", hint: "link", href: site.linkedin },
  { id: "theme", label: "toggle tema", hint: "ação", action: "theme" },
];

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [seenQuery, setSeenQuery] = useState(query);
  if (seenQuery !== query) {
    setSeenQuery(query);
    setActive(0);
  }
  const titleId = useId();
  const { resolvedTheme, setTheme } = useTheme();

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (dialog.open) dialog.close();
        else open();
      }
    }
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-palette]")) open();
    }
    function open() {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      setQuery("");
      dialog.showModal();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  function run(item: Item | undefined) {
    if (!item) return;
    if (item.action === "theme") {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    }
    close();
  }

  return (
    <dialog className="pal" ref={dialogRef} aria-labelledby={titleId} onClick={(event) => {
      if (event.target === dialogRef.current) close();
    }}>
      <div className="pal__in">
        <span aria-hidden="true">&gt;</span>
        <input
          ref={inputRef}
          id="pal-q"
          type="text"
          placeholder={m.palettePlaceholder}
          autoComplete="off"
          aria-label={m.paletteLabel}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(index + 1, Math.max(visible.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              const item = visible[active];
              if (!item) return;
              if (item.action) run(item);
              else {
                const node = document.getElementById(`pal-${item.id}`) as HTMLAnchorElement | null;
                node?.click();
                close();
              }
            }
          }}
        />
        <kbd>esc</kbd>
      </div>
      <p id={titleId} className="sr-only">
        {m.paletteLabel}
      </p>
      <ul>
        {visible.length === 0 ? <li className="px-3 py-2 font-mono text-sm text-faint">{m.emptyPalette}</li> : null}
        {visible.map((item, index) => {
          const className = index === active ? "sel" : undefined;
          const body = (
            <>
              {item.label}
              <span>{item.hint}</span>
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                item.href.startsWith("http") ? (
                  <a
                    id={`pal-${item.id}`}
                    className={className}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={close}
                  >
                    {body}
                  </a>
                ) : (
                  <Link id={`pal-${item.id}`} className={className} href={item.href} onClick={close}>
                    {body}
                  </Link>
                )
              ) : (
                <button id={`pal-${item.id}`} className={className} type="button" onClick={() => run(item)}>
                  {body}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}

"use client";

import { useState } from "react";
import { m } from "@/lib/i18n";
import { site } from "@/lib/site";

export function CopyEmail() {
  const [label, setLabel] = useState<string>(m.copy);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setLabel(m.copied);
      window.setTimeout(() => setLabel(m.copy), 1600);
    } catch {
      setLabel(m.copy);
    }
  }

  return (
    <button className="btn btn--sm" type="button" onClick={copy}>
      {label}
    </button>
  );
}

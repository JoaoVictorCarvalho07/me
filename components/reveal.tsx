"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;

    const watch = (node: HTMLElement) => {
      if (node.classList.contains("in")) return;
      if (reduce || !observer) {
        node.classList.add("in");
        return;
      }
      observer.observe(node);
    };

    const scan = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.hasAttribute("data-reveal")) watch(root);
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);
    };

    if (!reduce) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
    }

    scan(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) scan(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}

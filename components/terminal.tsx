"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/site";

const COMMANDS = ["whoami", "ls ~/projetos --featured"] as const;

export function Terminal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    if (reduce) {
      steps.forEach((step) => step.classList.add("on"));
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    async function run() {
      for (const step of steps) {
        if (cancelled) return;
        step.classList.add("on");
        const cmd = step.querySelector<HTMLElement>("[data-type]");
        if (cmd) {
          const full = cmd.dataset.type ?? "";
          cmd.textContent = "";
          const caret = document.createElement("span");
          caret.className = "caret";
          caret.setAttribute("aria-hidden", "true");
          cmd.after(caret);
          await sleep(350);
          for (const char of full) {
            if (cancelled) return;
            cmd.textContent += char;
            await sleep(38 + Math.random() * 40);
          }
          await sleep(260);
          caret.remove();
        } else {
          await sleep(160);
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="win term"
      role="img"
      aria-label="Terminal mostrando whoami: João Victor Carvalho, dev full-stack, 23 anos, Curitiba, estudante de BSI na PUCPR."
    >
      <div className="win__bar">
        <span className="win__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="win__path">
          joao@curitiba: <b>~</b>
        </span>
        <span>zsh</span>
      </div>
      <div className="term__body typing" id="term" ref={rootRef}>
        <div className="ln" data-step="1">
          <span className="ps">
            joao@curitiba <span className="path">~</span> <span className="sig">$</span>
          </span>{" "}
          <span className="cmd" data-type={COMMANDS[0]}>
            {COMMANDS[0]}
          </span>
        </div>
        <div className="out" data-step="2">
          <div className="fetch">
            <div className="fetch__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/joao.webp")} alt="" width={240} height={300} />
            </div>
            <dl>
              <div className="hd">
                joao<span>@</span>joao.dev
              </div>
              <div className="rule">──────────────────</div>
              <dt>nome</dt>
              <dd>João Victor Carvalho</dd>
              <dt>papel</dt>
              <dd>dev full-stack</dd>
              <dt>base</dt>
              <dd>Curitiba, PR</dd>
              <dt>idade</dt>
              <dd>23</dd>
              <dt>curso</dt>
              <dd>BSI @ PUCPR</dd>
              <dt>foco</dt>
              <dd>backend, APIs, infra</dd>
              <dt>shell</dt>
              <dd>joao.dev()</dd>
            </dl>
          </div>
        </div>
        <div className="ln" data-step="3">
          <span className="ps">
            joao@curitiba <span className="path">~</span> <span className="sig">$</span>
          </span>{" "}
          <span className="cmd" data-type={COMMANDS[1]}>
            {COMMANDS[1]}
          </span>
        </div>
        <div className="out ls" data-step="4">
          <span className="dir">sing/</span>
          <span className="dir">vitasmile/</span>
          <span className="dir">site-isabel-pontes/</span>
          <span className="dir">api-dados-abertos-saude/</span>
          <span className="dir">nasa-explorer/</span>
          <span className="dir">dp-projeto-final-docs/</span>
        </div>
        <div className="ln" data-step="5">
          <span className="ps">
            joao@curitiba <span className="path">~</span> <span className="sig">$</span>
          </span>{" "}
          <span className="caret" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

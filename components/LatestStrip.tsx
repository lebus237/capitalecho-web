"use client";

import { useEffect, useRef } from "react";
import { SECTIONS, editionsOf } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = { selected: number; onPick: (index: number) => void };

export default function LatestStrip({ selected, onPick }: Props) {
  const row = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const reduced = usePrefersReducedMotion();

  // Bring the selected card to the strip's snap point (horizontal only: never moves the page).
  useEffect(() => {
    const r = row.current;
    const card = r?.children[selected] as HTMLElement | undefined;
    if (!r || !card) return;
    const left = card.offsetLeft - 16; // matches the row's 16px scroll-padding
    r.scrollTo({ left, behavior: first.current || reduced ? "auto" : "smooth" });
    first.current = false;
  }, [selected, reduced]);

  return (
    <section className="latest" aria-labelledby="ce-latest-title">
      <h2 id="ce-latest-title" className="latest__title">
        Latest across all sections
      </h2>
      <div ref={row} className="latest__row hide-scrollbar">
        {SECTIONS.map((s, i) => {
          const first = editionsOf(s.n)[0];
          const on = i === selected;
          return (
            <button
              key={s.n}
              type="button"
              className={on ? "latest__card latest__card--on" : "latest__card"}
              aria-label={`${s.name} : ${first ? first.title : "aucune publication"}`}
              aria-pressed={on}
              onClick={() => onPick(i)}
            >
              <span className={first ? "latest__head" : "latest__head latest__head--empty"}>
                {first ? first.title : "Aucune publication"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

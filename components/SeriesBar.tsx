"use client";

import { SECTIONS } from "@/lib/data";
import { useApp } from "@/lib/store";

/** Horizontal series switcher used on the About / Playlist tabs. */
export default function SeriesBar() {
  const { selected, setSelected } = useApp();
  return (
    <div className="chips hide-scrollbar" role="group" aria-label="Série">
      {SECTIONS.map((s, i) => (
        <button key={s.n} type="button" className={i === selected ? "chip chip--on" : "chip"} aria-pressed={i === selected} onClick={() => setSelected(i)}>
          {s.name}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EDITIONS, SECTIONS, entryId } from "@/lib/data";
import { useApp } from "@/lib/store";
import { CloseIcon, SearchIcon } from "./icons";
import Sheet from "./Sheet";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function SearchSheet() {
  const { sheet, closeSheet } = useApp();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [series, setSeries] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const open = sheet === "search";

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    return EDITIONS.filter((e) => !series || e.n === series)
      .map((e) => {
        const hit = e.entries.find((l) => terms.length && terms.every((t) => norm(l).includes(t)));
        const hay = norm([e.title, e.kicker, e.places, e.summary, ...e.entries].join(" "));
        const ok = terms.length ? terms.every((t) => hay.includes(t)) : false;
        return ok ? { e, entry: hit } : null;
      })
      .filter((x): x is { e: (typeof EDITIONS)[number]; entry: string | undefined } => x !== null);
  }, [q, series]);

  if (!open) return null;

  return (
    <Sheet label="Recherche" onClose={closeSheet} full>
      <div className="search__bar">
        <SearchIcon size={20} />
        <input
          ref={input}
          className="search__input"
          type="search"
          placeholder="Publications, pays, marchés, entreprises…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Rechercher"
        />
        <button type="button" className="icon-btn" aria-label="Fermer la recherche" onClick={closeSheet}>
          <CloseIcon size={22} />
        </button>
      </div>
      <div className="chips hide-scrollbar" role="group" aria-label="Filtrer par série">
        <button type="button" className={!series ? "chip chip--on" : "chip"} aria-pressed={!series} onClick={() => setSeries(null)}>
          Toutes
        </button>
        {SECTIONS.map((s) => (
          <button key={s.n} type="button" className={series === s.n ? "chip chip--on" : "chip"} aria-pressed={series === s.n} onClick={() => setSeries(series === s.n ? null : s.n)}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="search__results" aria-live="polite">
        {!q.trim() && <p className="muted pad">Tapez un mot-clé : un pays, une bourse, une entreprise, un sujet…</p>}
        {q.trim() && results.length === 0 && <p className="muted pad">Aucun résultat pour « {q} ».</p>}
        {results.map(({ e, entry }) => (
          <button
            key={e.id}
            type="button"
            className="search__item"
            onClick={() => {
              closeSheet();
              router.push(`/edition/${e.id}${entry ? `?entry=${entryId(entry)}` : ""}`);
            }}
          >
            <span className="edition__kicker">{e.kicker}</span>
            <span className="search__title">{e.title}</span>
            <span className="muted small">
              {entry ? `${entry} · ` : ""}
              {e.date}
            </span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}

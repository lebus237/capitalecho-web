"use client";

import { SECTIONS, editionsOf } from "@/lib/data";
import { useApp } from "@/lib/store";
import EditionCard from "@/components/EditionCard";
import SeriesBar from "@/components/SeriesBar";

export default function PlaylistPage() {
  const { selected } = useApp();
  const s = SECTIONS[selected];
  const editions = editionsOf(s.n);

  return (
    <>
      <h1 className="page-title">Playlist</h1>
      <SeriesBar />
      <section className="page" aria-label={`Éditions de ${s.name}`}>
        <p className="muted">
          {s.name} · {editions.length} édition{editions.length > 1 ? "s" : ""} publiée{editions.length > 1 ? "s" : ""}
        </p>
        {editions.map((e) => (
          <EditionCard key={e.id} edition={e} variant="row" />
        ))}
        {editions.length === 0 && <p className="muted">Aucune édition disponible pour le moment.</p>}
      </section>
    </>
  );
}

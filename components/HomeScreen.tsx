"use client";

import Link from "next/link";
import { useRef } from "react";
import { SECTIONS, editionsOf } from "@/lib/data";
import { useApp } from "@/lib/store";
import { ArrowRightIcon } from "./icons";
import EditionCard from "./EditionCard";
import LatestStrip from "./LatestStrip";
import Wheel from "./Wheel";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function HomeScreen() {
  const { selected, setSelected } = useApp();
  const reduced = usePrefersReducedMotion();
  const wheelRef = useRef<HTMLDivElement>(null);
  const cur = SECTIONS[selected];

  const pickFromLatest = (i: number) => {
    setSelected(i);
    wheelRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  };
  const editions = editionsOf(cur.n);

  return (
    <>
      <div ref={wheelRef} className="wheel-anchor">
        <Wheel selected={selected} onPick={setSelected} />
      </div>
      <LatestStrip selected={selected} onPick={pickFromLatest} />
      <section className="feed" aria-labelledby="ce-section-title">
        <div className="feed__head">
          <span className="feed__bar" />
          <div className="feed__titles">
            <h1 id="ce-section-title" className="feed__name">{cur.name}</h1>
            <p className="feed__promise">{cur.promise}</p>
            {cur.partner && <p className="feed__partner">{cur.partner}</p>}
          </div>
          <Link href="/playlist" className="feed__viewall">
            View all
            <ArrowRightIcon size={16} strokeWidth={1.8} />
          </Link>
        </div>
        {editions.map((ed, i) => (
          <EditionCard key={ed.id} edition={ed} index={i} />
        ))}
        {editions.length === 0 && (
          <div className="empty">
            <p className="empty__title">Aucune publication</p>
            <p className="empty__text">Aucune édition disponible pour le moment.</p>
          </div>
        )}
      </section>
    </>
  );
}

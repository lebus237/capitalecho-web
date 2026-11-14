"use client";

import { useEffect } from "react";
import { getShorts } from "@/lib/content";
import type { Edition } from "@/lib/data";
import { CloseIcon } from "./icons";

/** Full-screen vertical feed: one short card per section, scroll-snapped, swipe or arrow keys. */
export default function Shorts({ edition, entry, onClose }: { edition: Edition; entry: string; onClose: () => void }) {
  const items = getShorts(edition, entry);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="shorts" role="dialog" aria-modal="true" aria-label="Shorts" tabIndex={0}>
      <button type="button" className="shorts__close" aria-label="Fermer les Shorts" onClick={onClose}>
        <CloseIcon size={24} />
      </button>
      <div className="shorts__scroll hide-scrollbar">
        {items.map((s, i) => (
          <section key={s.id} className="short">
            <span className="short__count">{i + 1} / {items.length}</span>
            <p className="short__kicker">{entry}</p>
            <h2 className="short__title">{s.heading}</h2>
            <p className="short__text">{s.text}</p>
            {i < items.length - 1 && <span className="short__hint" aria-hidden="true">Balayez vers le haut ↑</span>}
          </section>
        ))}
      </div>
    </div>
  );
}

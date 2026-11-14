"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { coverOf, getSection, type Edition } from "@/lib/data";
import { useApp } from "@/lib/store";
import { BookmarkIcon, PinIcon } from "./icons";

export function SaveButton({ id, title }: { id: string; title: string }) {
  const { isFavorite, toggleFavorite, showToast } = useApp();
  const saved = isFavorite(id);
  const [pop, setPop] = useState(false);
  return (
    <button
      type="button"
      className="edition__save"
      aria-label={saved ? `Retirer des favoris : ${title}` : `Ajouter aux favoris : ${title}`}
      aria-pressed={saved}
      onClick={() => {
        toggleFavorite(id);
        setPop(true);
        showToast(saved ? "Retiré des favoris" : "Ajouté aux favoris");
      }}
    >
      <span className={pop ? "pop" : undefined} onAnimationEnd={() => setPop(false)}>
        <BookmarkIcon size={22} fill={saved ? "#a51e27" : "none"} />
      </span>
    </button>
  );
}

export default function EditionCard({ edition, variant = "feed", index = 0 }: { edition: Edition; variant?: "feed" | "row"; index?: number }) {
  const section = getSection(edition.n);
  const href = `/edition/${edition.id}`;
  const cover = coverOf(edition.n);

  if (variant === "row") {
    return (
      <article className="row-card">
        <Link href={href} className="row-card__thumb" aria-hidden="true" tabIndex={-1}>
          {cover ? (
            <Image src={cover.src} alt="" width={144} height={144} sizes="72px" className="row-card__img" />
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={section.icon} />
            </svg>
          )}
        </Link>
        <div className="row-card__text">
          <span className="edition__kicker">{edition.kicker}</span>
          <Link href={href} className="row-card__title">
            {edition.title}
          </Link>
          <span className="edition__meta">
            {edition.date}
          </span>
        </div>
        <SaveButton id={edition.id} title={edition.title} />
      </article>
    );
  }

  return (
    <article className="edition rise" style={{ animationDelay: `${index * 60}ms` }}>
      <Link href={href} className="edition__cover" aria-label={edition.title}>
        {cover ? (
          <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 430px) 100vw, 430px" className="edition__img" priority={index === 0} />
        ) : (
          <span className="edition__ph">[Couverture]</span>
        )}
      </Link>
      <div className="edition__body">
        <div className="edition__text">
          <span className="edition__kicker">{edition.kicker}</span>
          <Link href={href} className="edition__title">
            {edition.title}
          </Link>
          <span className="edition__meta">
            <PinIcon size={14} />
            {edition.places}
          </span>
          <span className="edition__meta">{edition.date}</span>
        </div>
        <SaveButton id={edition.id} title={edition.title} />
      </div>
    </article>
  );
}

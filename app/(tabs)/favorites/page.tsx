"use client";

import Link from "next/link";
import { EDITIONS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { BookmarkIcon } from "@/components/icons";
import EditionCard from "@/components/EditionCard";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const saved = favorites.map((id) => EDITIONS.find((e) => e.id === id)).filter((e) => !!e);

  return (
    <>
      <h1 className="page-title">Favorites</h1>
      <section className="page" aria-label="Contenus enregistrés">
        {saved.map((e) => (
          <EditionCard key={e!.id} edition={e!} variant="row" />
        ))}
        {saved.length === 0 && (
          <div className="empty">
            <BookmarkIcon size={28} strokeWidth={1.5} />
            <p className="empty__title">Aucun favori</p>
            <p className="empty__text">Touchez le marque-page d’une publication pour la retrouver ici.</p>
            <Link href="/" className="btn btn--link">Découvrir les publications</Link>
          </div>
        )}
      </section>
    </>
  );
}

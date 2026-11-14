"use client";

import Link from "next/link";
import { SECTIONS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { BellIcon } from "@/components/icons";
import SeriesBar from "@/components/SeriesBar";

export default function AboutPage() {
  const { selected, user, toggleFollow, openSheet, showToast } = useApp();
  const s = SECTIONS[selected];
  const following = !!user?.follows.includes(s.n);

  return (
    <>
      <h1 className="page-title">About</h1>
      <SeriesBar />
      <section className="page" aria-labelledby="about-name">
        <div className="feed__head">
          <span className="feed__bar" />
          <div className="feed__titles">
            <h2 id="about-name" className="feed__name">{s.name}</h2>
            <p className="feed__promise">{s.promise}</p>
            {s.partner && <p className="feed__partner">{s.partner}</p>}
          </div>
        </div>

        <h3 className="about__h">Mission</h3>
        <p className="body">{s.about.mission}</p>
        <h3 className="about__h">Approche éditoriale</h3>
        <p className="body">{s.about.approach}</p>
        <h3 className="about__h">Rythme de publication</h3>
        <p className="body">{s.about.rhythm}</p>

        <button
          type="button"
          className={following ? "btn btn--ghost" : "btn"}
          aria-pressed={following}
          onClick={() => {
            if (!user) return openSheet("profile");
            toggleFollow(s.n);
            showToast(following ? "Notifications désactivées" : "Notifications activées");
          }}
        >
          <BellIcon size={18} /> {following ? "Notifications activées" : user ? "Activer les notifications" : "Créer un compte pour être notifié"}
        </button>
        <Link href="/playlist" className="btn btn--link">Voir les éditions</Link>
      </section>
    </>
  );
}

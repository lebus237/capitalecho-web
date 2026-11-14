"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { BookmarkIcon, HomeIcon, InfoIcon, PlaylistIcon } from "./icons";

export default function TabBar() {
  const pathname = usePathname();
  const { favorites } = useApp();
  // On Home the bar starts hidden and slides up the first time the user scrolls down; it then stays.
  const [revealed, setRevealed] = useState(false);
  const hidden = pathname === "/" && !revealed;
  useEffect(() => {
    if (revealed) return;
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      if (y > 8 && y > last) setRevealed(true);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [revealed]);
  const cur = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav className={hidden ? "tabbar tabbar--hidden" : "tabbar"} aria-label="Navigation principale" inert={hidden}>
      <Link href="/" className="tab" aria-current={cur("/")}>
        <HomeIcon strokeWidth={cur("/") ? 2.2 : 1.6} />
        Home
      </Link>
      <Link href="/about" className="tab" aria-current={cur("/about")}>
        <InfoIcon strokeWidth={cur("/about") ? 2.2 : 1.6} />
        About
      </Link>
      <Link href="/playlist" className="tab" aria-current={cur("/playlist")}>
        <PlaylistIcon strokeWidth={cur("/playlist") ? 2.2 : 1.6} />
        Playlist
      </Link>
      <Link href="/favorites" className="tab" aria-current={cur("/favorites")}>
        <span className="tab__icon">
          <BookmarkIcon strokeWidth={cur("/favorites") ? 2.2 : 1.6} />
          {favorites.length > 0 && <span className="tab__badge">{favorites.length}</span>}
        </span>
        Favorites
      </Link>
    </nav>
  );
}

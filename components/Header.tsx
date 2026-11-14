"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { SearchIcon, UserIcon } from "./icons";

export default function Header() {
  const { openSheet, user } = useApp();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 0);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const initials = user ? user.name.trim().slice(0, 1).toUpperCase() : null;
  return (
    <header className={scrolled ? "header header--scrolled" : "header"}>
      <Link href="/" aria-label="CapitalEcho — accueil">
        <Image
          className="header__logo"
          src="/capitalecho-logo.png"
          alt="CapitalEcho"
          width={8000}
          height={1536}
          priority
          style={{ width: 180, height: 34 }}
        />
      </Link>
      <div className="header__actions">
        <button className="icon-btn" aria-label="Rechercher" type="button" onClick={() => openSheet("search")}>
          <SearchIcon size={26} />
        </button>
        <button className="icon-btn" aria-label="Mon profil" type="button" onClick={() => openSheet("profile")}>
          <span className="avatar">{initials ? <b>{initials}</b> : <UserIcon size={18} />}</span>
        </button>
      </div>
    </header>
  );
}

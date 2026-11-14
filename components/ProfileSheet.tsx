"use client";

import { useState } from "react";
import { SECTIONS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { CloseIcon } from "./icons";
import Sheet from "./Sheet";

export default function ProfileSheet() {
  const { sheet, closeSheet, user, signUp, signOut, toggleFollow, showToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (sheet !== "profile") return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Indiquez votre prénom ou nom.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Indiquez une adresse e-mail valide.");
    signUp(name.trim(), email.trim());
    setError("");
    showToast("Compte créé");
  };

  return (
    <Sheet label="Profil" onClose={closeSheet}>
      <div className="sheet__head">
        <h2 className="sheet__title">{user ? "Mon profil" : "Créer un compte"}</h2>
        <button type="button" className="icon-btn" aria-label="Fermer" onClick={closeSheet}>
          <CloseIcon size={22} />
        </button>
      </div>

      {!user ? (
        <form className="form" onSubmit={submit} noValidate>
          <p className="muted">Un compte gratuit donne accès à Echo Intelligence et aux notifications par série.</p>
          <label className="field">
            Prénom ou nom
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label className="field">
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          {error && <p role="alert" className="form__error">{error}</p>}
          <button type="submit" className="btn">Créer mon compte</button>
          <p className="muted small">Démonstration : le compte est enregistré uniquement sur cet appareil.</p>
        </form>
      ) : (
        <div className="form">
          <p>
            <strong>{user.name}</strong>
            <br />
            <span className="muted">{user.email}</span>
          </p>
          <h3 className="sheet__sub">Notifications par série</h3>
          <ul className="toggles">
            {SECTIONS.map((s) => {
              const on = user.follows.includes(s.n);
              return (
                <li key={s.n}>
                  <label className="toggle">
                    <span>{s.name}</span>
                    <input type="checkbox" role="switch" checked={on} onChange={() => toggleFollow(s.n)} />
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              signOut();
              closeSheet();
              showToast("Déconnecté");
            }}
          >
            Se déconnecter
          </button>
        </div>
      )}
    </Sheet>
  );
}

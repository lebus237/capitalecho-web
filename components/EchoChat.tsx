"use client";

import { useEffect, useRef, useState } from "react";
import { askEcho, SUGGESTED_QUESTIONS } from "@/lib/echo";
import type { Edition } from "@/lib/data";
import { useApp } from "@/lib/store";
import { CloseIcon, SendIcon, SparkIcon } from "./icons";
import Sheet from "./Sheet";

type Msg = { from: "me" | "echo"; text: string; source?: string };

export default function EchoChat({ edition, entry, onClose }: { edition: Edition; entry: string; onClose: () => void }) {
  const { user, openSheet } = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const r = askEcho(t, edition, entry);
    setMsgs((m) => [...m, { from: "me", text: t }, { from: "echo", text: r.answer, source: r.source }]);
    setQ("");
  };

  return (
    <Sheet label="Echo Intelligence" onClose={onClose}>
      <div className="sheet__head">
        <h2 className="sheet__title"><SparkIcon size={20} /> Echo Intelligence</h2>
        <button type="button" className="icon-btn" aria-label="Fermer" onClick={onClose}>
          <CloseIcon size={22} />
        </button>
      </div>

      {!user ? (
        <div className="form">
          <p className="muted">Echo répond à vos questions sur cette publication. L’accès nécessite un compte gratuit.</p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onClose();
              openSheet("profile");
            }}
          >
            Créer un compte
          </button>
        </div>
      ) : (
        <>
          <div className="chat" aria-live="polite">
            {msgs.length === 0 && <p className="muted">Posez une question sur « {entry} ». Echo ne répond qu’à partir de cette édition.</p>}
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "bubble bubble--me" : "bubble"}>
                {m.text}
                {m.source && <span className="bubble__src">Source : {m.source}</span>}
              </div>
            ))}
            <div ref={end} />
          </div>
          <div className="chips hide-scrollbar chips--flush">
            {SUGGESTED_QUESTIONS.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => ask(s)}>{s}</button>
            ))}
          </div>
          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(q);
            }}
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Votre question…" aria-label="Votre question" />
            <button type="submit" className="icon-btn" aria-label="Envoyer">
              <SendIcon size={22} />
            </button>
          </form>
        </>
      )}
    </Sheet>
  );
}

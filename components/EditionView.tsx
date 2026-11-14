"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { getArticle } from "@/lib/content";
import { entryId, getSection, type Edition } from "@/lib/data";
import { useApp } from "@/lib/store";
import { BackIcon, ChevronDownIcon, PinIcon, PlayIcon, ShareIcon, SparkIcon } from "./icons";
import { SaveButton } from "./EditionCard";
import EchoChat from "./EchoChat";
import ProfileSheet from "./ProfileSheet";
import Shorts from "./Shorts";

export type Format = "articles" | "videos" | "shorts";

const FORMATS: { key: Format; title: string; tag: string; hint: string }[] = [
  { key: "articles", title: "Articles", tag: "Read", hint: "Go deeper" },
  { key: "videos", title: "Videos", tag: "Watch", hint: "See the story unfold" },
  { key: "shorts", title: "Shorts", tag: "Discover", hint: "Discover in seconds" },
];

export default function EditionView({ edition, initialEntry, initialFormat }: { edition: Edition; initialEntry?: string; initialFormat: Format }) {
  const section = getSection(edition.n);
  const { showToast } = useApp();

  const startEntry = Math.max(0, edition.entries.findIndex((l) => entryId(l) === initialEntry));
  const [entryIdx, setEntryIdx] = useState(startEntry);
  const [format, setFormat] = useState<Format>(initialFormat);
  const [open, setOpen] = useState<Record<string, boolean>>({ s1: true, s2: true });
  const [echoOpen, setEchoOpen] = useState(false);

  const entry = edition.entries[entryIdx];
  const sections = useMemo(() => getArticle(edition, entry), [edition, entry]);

  const syncUrl = useCallback(
    (e: number, f: Format) => {
      const p = new URLSearchParams();
      if (edition.entries.length > 1) p.set("entry", entryId(edition.entries[e]));
      if (f !== "articles") p.set("format", f);
      const qs = p.toString();
      window.history.replaceState(null, "", `/edition/${edition.id}${qs ? `?${qs}` : ""}`);
    },
    [edition],
  );

  const pickEntry = (i: number) => {
    setEntryIdx(i);
    setOpen({ s1: true, s2: true });
    syncUrl(i, format);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pickFormat = (f: Format) => {
    setFormat(f);
    syncUrl(entryIdx, f);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: edition.title, text: edition.summary, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("Lien copié");
    } catch (err) {
      if ((err as Error).name !== "AbortError") showToast("Impossible de copier le lien");
    }
  };

  const jump = (id: string) => {
    setOpen((o) => ({ ...o, [id]: true }));
    requestAnimationFrame(() => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <header className="reader-bar">
        <Link href="/" className="icon-btn" aria-label="Retour à l’accueil">
          <BackIcon size={24} />
        </Link>
        <span className="reader-bar__series">{section.name}</span>
        <button type="button" className="icon-btn" aria-label="Partager" onClick={share}>
          <ShareIcon size={22} />
        </button>
        <SaveButton id={edition.id} title={edition.title} />
      </header>

      <main className="reader">
        <p className="edition__kicker">{section.promise}</p>
        <h1 className="reader__title">{edition.title}</h1>
        <p className="edition__meta">
          {edition.date} · {edition.author}
        </p>
        <p className="edition__meta">
          <PinIcon size={14} />
          {edition.places}
        </p>

        <div className="formats" role="tablist" aria-label="Choisir un format">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              role="tab"
              type="button"
              aria-selected={format === f.key}
              className={format === f.key ? "format format--on" : "format"}
              onClick={() => pickFormat(f.key)}
            >
              <span className="format__tag">{f.tag}</span>
              <strong>{f.title}</strong>
              <span className="format__hint">{f.hint}</span>
            </button>
          ))}
        </div>

        {edition.entries.length > 1 && (
          <nav aria-label="Dans cette édition" className="entries">
            <p className="entries__label">Édition — {edition.kicker}</p>
            <div className="chips hide-scrollbar chips--flush">
              {edition.entries.map((l, i) => (
                <button key={l} type="button" className={i === entryIdx ? "chip chip--on" : "chip"} aria-current={i === entryIdx} onClick={() => pickEntry(i)}>
                  {l}
                </button>
              ))}
            </div>
          </nav>
        )}

        {format === "articles" && (
          <article>
            <p className="demo-note">Contenu de démonstration — à remplacer par les textes de la rédaction.</p>
            <h2 className="reader__entry">{entry}</h2>

            <nav aria-label="Sommaire" className="toc">
              <p className="entries__label">Sommaire</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => jump(s.id)}>{s.heading}</button>
                  </li>
                ))}
              </ol>
            </nav>

            {sections.map((s) => {
              const isOpen = !!open[s.id];
              return (
                <section key={s.id} id={`sec-${s.id}`} className="block">
                  <h3>
                    <button type="button" className="block__btn" aria-expanded={isOpen} aria-controls={`panel-${s.id}`} onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}>
                      {s.heading}
                      <span className={isOpen ? "block__chev block__chev--open" : "block__chev"}>
                        <ChevronDownIcon size={20} />
                      </span>
                    </button>
                  </h3>
                  {isOpen && (
                    <div id={`panel-${s.id}`} className="block__panel">
                      {s.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </article>
        )}

        {format === "videos" && (
          <section aria-label="Vidéo" className="video">
            <div className="video__player">
              <span className="video__play" aria-hidden="true">
                <PlayIcon size={30} fill="currentColor" />
              </span>
              <p>Vidéo bientôt disponible</p>
            </div>
            <h2 className="reader__entry">{entry}</h2>
            <p className="body">{edition.summary}</p>
          </section>
        )}
      </main>

      {format === "shorts" && <Shorts edition={edition} entry={entry} onClose={() => pickFormat("articles")} />}

      <button type="button" className="echo-fab" onClick={() => setEchoOpen(true)}>
        <SparkIcon size={18} /> Echo
      </button>
      {echoOpen && <EchoChat edition={edition} entry={entry} onClose={() => setEchoOpen(false)} />}
      <ProfileSheet />
    </>
  );
}

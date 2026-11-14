import { getArticle } from "./content";
import type { Edition } from "./data";

const STOP = new Set(["dans", "pour", "avec", "cette", "quel", "quelle", "quels", "quelles", "sont", "est", "les", "des", "une", "que", "qui", "quoi", "comment", "pourquoi", "plus", "sur", "par", "aux", "ses", "leur"]);

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const words = (s: string) => norm(s).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w));

export const SUGGESTED_QUESTIONS = [
  "Quel est l’enjeu principal ?",
  "Qui sont les acteurs concernés ?",
  "Quelles sont les perspectives ?",
];

/**
 * Local, extractive stand-in for Echo Intelligence: answers only from the text of the
 * edition being read. Swap for a call to an LLM endpoint when the backend exists.
 */
export function askEcho(question: string, edition: Edition, entryLabel: string): { answer: string; source?: string } {
  const q = new Set(words(question));
  const sections = getArticle(edition, entryLabel);
  const scored: { score: number; sentence: string; heading: string }[] = [];
  for (const s of sections) {
    const headingWords = words(s.heading);
    for (const p of s.paragraphs) {
      for (const sentence of p.split(/(?<=[.!?»])\s+/)) {
        const w = new Set(words(sentence));
        let score = 0;
        q.forEach((x) => {
          if (w.has(x)) score += 1;
          if (headingWords.includes(x)) score += 1.5;
        });
        if (score > 0) scored.push({ score, sentence, heading: s.heading });
      }
    }
  }
  scored.sort((a, b) => b.score - a.score);
  if (!scored.length) {
    return { answer: "Je n’ai pas trouvé d’éléments sur ce point dans cette édition. Essayez une question plus précise ou l’une des suggestions." };
  }
  const top = scored.slice(0, 2);
  return { answer: top.map((t) => t.sentence).join(" "), source: top[0].heading };
}

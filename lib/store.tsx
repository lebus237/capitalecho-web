"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DEFAULT_SECTION_INDEX, SECTIONS } from "./data";

export type User = { name: string; email: string; follows: string[] };
export type Sheet = "search" | "profile" | null;

type Persisted = { selected: number; favorites: string[]; user: User | null };

type Store = Persisted & {
  sheet: Sheet;
  toast: string | null;
  setSelected: (i: number) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  toggleFollow: (n: string) => void;
  openSheet: (s: Exclude<Sheet, null>) => void;
  closeSheet: () => void;
  showToast: (msg: string) => void;
};

const KEY = "capitalecho:v1";
const DEFAULTS: Persisted = { selected: DEFAULT_SECTION_INDEX, favorites: [], user: null };
const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw) as Partial<Persisted>;
        setState({
          selected: typeof p.selected === "number" && p.selected >= 0 && p.selected < SECTIONS.length ? p.selected : DEFAULTS.selected,
          favorites: Array.isArray(p.favorites) ? p.favorites : [],
          user: p.user && typeof p.user.name === "string" ? { ...p.user, follows: p.user.follows ?? [] } : null,
        });
      }
    } catch {
      /* storage unavailable or corrupted: keep defaults */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state, ready]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const value = useMemo<Store>(
    () => ({
      ...state,
      sheet,
      toast,
      setSelected: (selected) => setState((s) => ({ ...s, selected })),
      isFavorite: (id) => state.favorites.includes(id),
      toggleFavorite: (id) =>
        setState((s) => {
          const on = s.favorites.includes(id);
          return { ...s, favorites: on ? s.favorites.filter((x) => x !== id) : [...s.favorites, id] };
        }),
      signUp: (name, email) =>
        setState((s) => ({ ...s, user: { name, email, follows: SECTIONS.map((x) => x.n) } })),
      signOut: () => setState((s) => ({ ...s, user: null })),
      toggleFollow: (n) =>
        setState((s) =>
          s.user
            ? { ...s, user: { ...s.user, follows: s.user.follows.includes(n) ? s.user.follows.filter((x) => x !== n) : [...s.user.follows, n] } }
            : s,
        ),
      openSheet: setSheet,
      closeSheet: () => setSheet(null),
      showToast,
    }),
    [state, sheet, toast, showToast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside <AppProvider>");
  return v;
}

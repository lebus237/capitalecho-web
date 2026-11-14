"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Minimal modal bottom sheet: Escape closes, focus moves inside, body scroll locked. */
export default function Sheet({ label, onClose, full, children }: { label: string; onClose: () => void; full?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="sheet-wrap">
      <div className="sheet-backdrop" onClick={onClose} />
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label} className={full ? "sheet sheet--full" : "sheet"}>
        {children}
      </div>
    </div>
  );
}

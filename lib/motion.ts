"use client";

import { useEffect, useRef, useState } from "react";

/** True when the user asked the OS/browser for reduced motion. SSR-safe (false until mounted). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Animates a number toward `target` with an ease-out curve; jumps instantly when `instant`. */
export function useTween(target: number, ms: number, instant: boolean) {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (instant) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      current.current = from + (target - from) * eased;
      setValue(current.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, instant]);

  return value;
}

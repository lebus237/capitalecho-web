"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/lib/data";
import { usePrefersReducedMotion, useTween } from "@/lib/motion";

const COUNT = SECTIONS.length; // 9
const STEP = 360 / COUNT; // 40°
const START = -110; // first wedge starts at -110° (just left of 12 o'clock)
const CX = 180;
const CY = 180;
const R_OUT = 170;
const R_IN = 80;
const DESIGN_SIZE = 380; // design renders the 360 stage scaled to 380px
const STAGE_SCALE = DESIGN_SIZE / 360;

const FADE_MS = 250; // centre title/icon cross-fade
const RING_MS = 400; // progress ring + wedge fill
const DRAG_THRESHOLD = 40;

const rad = (d: number) => (d * Math.PI) / 180;
const px = (r: number, deg: number) => CX + r * Math.cos(rad(deg));
const py = (r: number, deg: number) => CY + r * Math.sin(rad(deg));
const f = (n: number) => n.toFixed(1);

function wedgePath(i: number) {
  const a0 = START + STEP * i;
  const a1 = a0 + STEP;
  return (
    `M${f(px(R_OUT, a0))} ${f(py(R_OUT, a0))} ` +
    `A${R_OUT} ${R_OUT} 0 0 1 ${f(px(R_OUT, a1))} ${f(py(R_OUT, a1))} ` +
    `L${f(px(R_IN, a1))} ${f(py(R_IN, a1))} ` +
    `A${R_IN} ${R_IN} 0 0 0 ${f(px(R_IN, a0))} ${f(py(R_IN, a0))} Z`
  );
}

const WEDGES = SECTIONS.map((_, i) => wedgePath(i));
const DIVIDERS = SECTIONS.map((_, k) => {
  const a = START + STEP * k;
  return { x1: px(R_IN, a), y1: py(R_IN, a), x2: px(R_OUT, a), y2: py(R_OUT, a) };
});
// Label anchor sits at the middle of each wedge, 125 from the centre.
const LABEL_POS = SECTIONS.map((_, i) => {
  const a = rad(-90 + STEP * i);
  return { x: CX + 125 * Math.cos(a), y: CY + 125 * Math.sin(a) };
});

const sweepFor = (sel: number) => Math.min(STEP * (sel + 1), 359.9);

function progressRing(sweep: number) {
  const pt = (d: number) => `${(CX + R_IN * Math.cos(rad(d))).toFixed(2)} ${(CY + R_IN * Math.sin(rad(d))).toFixed(2)}`;
  return `M ${pt(-110)} A ${R_IN} ${R_IN} 0 ${sweep > 180 ? 1 : 0} 1 ${pt(-110 + sweep)}`;
}

function CenterContent({ index, className }: { index: number; className: string }) {
  const cur = SECTIONS[index];
  const words = cur.name.split(" ");
  const longest = Math.max(...words.map((w) => w.length));
  const titleSize = longest >= 11 ? 12 : longest >= 9 ? 13.5 : 15;
  return (
    <div className={className} aria-hidden={className.includes("--out") || undefined}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c1a19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={cur.icon} />
      </svg>
      <p className="wheel__title" style={{ fontSize: titleSize, lineHeight: `${Math.round(titleSize * 1.2)}px` }}>
        <span>{words[0]}</span>
        <span>{words.slice(1).join(" ")}</span>
      </p>
      <p className="wheel__promise">{cur.promise}</p>
      <span className="wheel__rule" />
    </div>
  );
}

type WheelProps = {
  selected: number;
  showNumbers?: boolean;
  onPick: (index: number) => void;
};

export default function Wheel({ selected, showNumbers = false, onPick }: WheelProps) {
  const reduced = usePrefersReducedMotion();
  const swipeRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const swipeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fit, setFit] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Cross-fade: remember the section we just left and render it fading out on top.
  const [prev, setPrev] = useState(selected);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  if (prev !== selected) {
    setOutgoing(prev);
    setPrev(selected);
  }
  useEffect(() => {
    if (outgoing === null) return;
    const t = setTimeout(() => setOutgoing(null), FADE_MS);
    return () => clearTimeout(t);
  }, [outgoing]);

  // Progress ring grows/shrinks from its old length to the new one.
  const sweep = useTween(sweepFor(selected), RING_MS, reduced);

  // The wheel is a fixed 380px design; shrink it on screens narrower than that.
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    const update = () => setFit(Math.min(1, el.clientWidth / DESIGN_SIZE));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => {
    if (swipeTimer.current) clearTimeout(swipeTimer.current);
  }, []);

  const go = (i: number) => onPick((i + COUNT) % COUNT);

  const tap = (i: number) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    go(i);
  };

  const holdSwipeFlag = () => {
    swiped.current = true;
    if (swipeTimer.current) clearTimeout(swipeTimer.current);
    swipeTimer.current = setTimeout(() => {
      swiped.current = false;
    }, 400);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true; // a drag must never register as a tap on release
      setDragging(true);
      // The wheel follows the finger slightly (30% of the drag, capped).
      if (!reduced) setDragX(Math.max(-36, Math.min(36, dx * 0.3)));
    }
  };
  const endDrag = () => {
    setDragging(false);
    setDragX(0); // released: the spring transition on .wheel__frame snaps it back
  };
  const onPointerCancel = () => {
    start.current = null;
    endDrag();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    endDrag();
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (swiped.current) holdSwipeFlag();
    if (Math.abs(dx) > DRAG_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(selected + (dx < 0 ? 1 : -1));
    }
  };

  const size = DESIGN_SIZE * fit;
  const animateCenter = outgoing !== null;

  return (
    <section className="wheel" aria-label="Rubriques">
      <div
        ref={swipeRef}
        className="wheel__swipe"
        style={{ height: size }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="wheel__frame"
          style={{
            width: size,
            height: size,
            transform: `translateX(${dragX}px)`,
            transition: dragging || reduced ? "none" : "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="wheel__stage" style={{ transform: `scale(${STAGE_SCALE * fit})` }}>
            <svg className="wheel__svg" width="360" height="360" viewBox="0 0 360 360" aria-hidden="true">
              <circle
                cx={CX}
                cy={CY}
                r="177"
                fill="#ffffff"
                style={{ filter: "drop-shadow(0 0 1.5px rgba(28,26,25,0.06))" }}
              />
              {WEDGES.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  className={i === selected ? "wedge wedge--on" : "wedge"}
                  style={{ fill: i === selected ? "#a51e27" : "#ffffff" }}
                  onClick={() => tap(i)}
                />
              ))}
              {DIVIDERS.map((l, k) => {
                const edge = k === selected || k === (selected + COUNT - 1) % COUNT;
                return (
                  <line
                    key={k}
                    x1={f(l.x1)}
                    y1={f(l.y1)}
                    x2={f(l.x2)}
                    y2={f(l.y2)}
                    stroke="#e3e0e0"
                    strokeWidth="1"
                    strokeDasharray={edge ? "none" : "4 3"}
                  />
                );
              })}
              <circle cx={CX} cy={CY} r={R_IN} fill="#ffffff" />
              <circle cx={CX} cy={CY} r={R_IN} fill="none" stroke="#e3e0e0" strokeWidth="5" />
              <path d={progressRing(sweep)} fill="none" stroke="#b4444c" strokeWidth="5" />
            </svg>

            {SECTIONS.map((s, i) => {
              const on = i === selected;
              return (
                <button
                  key={s.n}
                  type="button"
                  className={on ? "wheel__seg wheel__seg--on" : "wheel__seg"}
                  style={{ left: LABEL_POS[i].x - 38, top: LABEL_POS[i].y - 42 }}
                  aria-label={`${s.n} ${s.name}`}
                  aria-pressed={on}
                  onClick={() => tap(i)}
                >
                  {showNumbers && <span className="wheel__num">{i + 1}</span>}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                  <span className="wheel__label">{s.name}</span>
                </button>
              );
            })}

            {outgoing !== null && <CenterContent index={outgoing} className="wheel__center wheel__center--out" />}
            <CenterContent
              key={selected}
              index={selected}
              className={animateCenter ? "wheel__center wheel__center--in" : "wheel__center"}
            />
          </div>
        </div>
      </div>

      <div className="wheel__dots">
        {SECTIONS.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className="wheel__dot-btn"
            aria-label={`${s.n} ${s.name}`}
            aria-current={i === selected}
            onClick={() => go(i)}
          >
            <span className={i === selected ? "wheel__dot wheel__dot--on" : "wheel__dot"} />
          </button>
        ))}
      </div>
    </section>
  );
}

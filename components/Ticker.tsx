"use client";

import { useState } from "react";
import { TICKER } from "@/lib/data";

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="ticker__group" aria-hidden={hidden || undefined}>
      {TICKER.map((tk) => (
        <span className="ticker__item" key={tk.name}>
          <span className="ticker__name">{tk.name}</span>
          <span className="ticker__num">{tk.value}</span>
          <span className="ticker__num">{tk.change}</span>
          <span className="ticker__date">{tk.date}</span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  // Touching the strip pauses the scroll; releasing resumes it.
  const [paused, setPaused] = useState(false);
  return (
    <div className="ticker" role="region" aria-label="Marchés — dernières clôtures">
      <span className="ticker__badge">CLÔTURE</span>
      <div
        className="ticker__track"
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* Two identical groups: translating by -50% loops with no visible jump. */}
        <div className="ticker__run" style={{ animationPlayState: paused ? "paused" : "running" }}>
          <Group />
          <Group hidden />
        </div>
      </div>
    </div>
  );
}

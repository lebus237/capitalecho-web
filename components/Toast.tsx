"use client";

import { useApp } from "@/lib/store";

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

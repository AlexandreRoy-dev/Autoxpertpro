"use client";

import { useEffect, useRef } from "react";

export function Atmosphere({ variant = "light" }: { variant?: "light" | "dark" }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 28;
        const y = (event.clientY / window.innerHeight - 0.5) * 20;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const a = variant === "dark" ? "rgba(241,90,34,0.16)" : "rgba(241,90,34,0.14)";
  const b = variant === "dark" ? "rgba(80,120,200,0.12)" : "rgba(20,40,80,0.06)";

  return (
    <div className="atmosphere pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div ref={layer} className="absolute inset-[-40px] transition-transform duration-[900ms] ease-out">
        <div
          className="atmosphere-orb"
          style={{
            width: 420,
            height: 420,
            background: a,
            top: "-80px",
            right: "8%",
            animation: "orb-a 28s var(--ease) infinite",
          }}
        />
        <div
          className="atmosphere-orb"
          style={{
            width: 340,
            height: 340,
            background: b,
            bottom: "4%",
            left: "-40px",
            animation: "orb-b 36s var(--ease) infinite",
          }}
        />
      </div>
    </div>
  );
}

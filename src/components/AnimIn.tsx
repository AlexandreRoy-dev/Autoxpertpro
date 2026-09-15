"use client";

import { useLayoutEffect, useRef } from "react";

export function AnimIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-in");
      return;
    }

    const reveal = () => node.classList.add("is-in");
    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (visible) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`anim-in ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

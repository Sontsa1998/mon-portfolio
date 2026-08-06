"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroParticles = dynamic(
  () => import("./hero-particles").then((m) => m.HeroParticles),
  { ssr: false },
);

export function HeroBackground() {
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setShow3d(isDesktop && !reducedMotion);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_75%)]" />
      <div
        className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-from), var(--accent-to) 60%, transparent 80%)",
        }}
      />
      {show3d && (
        <div className="absolute inset-0">
          <HeroParticles />
        </div>
      )}
    </div>
  );
}

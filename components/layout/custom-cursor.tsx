"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.4 });
  const spotlightElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFinePointer || reducedMotion) return;
    setEnabled(true);

    function clearSpotlight() {
      spotlightElRef.current?.classList.remove("cursor-spotlight-text");
      spotlightElRef.current = null;
    }

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, .cursor-hover",
      );
      setHovering(Boolean(interactive));

      // Buttons already carry their own readable text/background pairing —
      // only force the spotlight color on plain text-over-background links.
      const textTarget =
        interactive && !interactive.closest("[data-slot='button']")
          ? interactive
          : null;
      if (textTarget !== spotlightElRef.current) {
        clearSpotlight();
        if (textTarget) {
          textTarget.classList.add("cursor-spotlight-text");
          spotlightElRef.current = textTarget;
        }
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearSpotlight();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-[var(--accent-to)]"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
        mixBlendMode: hovering ? "normal" : "difference",
      }}
      animate={{
        scale: hovering ? 1.8 : 1,
        backgroundColor: hovering
          ? "color-mix(in oklab, var(--accent-to) 22%, transparent)"
          : "transparent",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}

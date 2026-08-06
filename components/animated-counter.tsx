"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (prefersReducedMotion) {
      node.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        const decimals = Number.isInteger(value) ? 0 : 1;
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, prefix, duration, prefersReducedMotion]);

  return (
    <span
      ref={(node) => {
        ref.current = node;
        inViewRef(node);
      }}
      className={className}
    >
      {prefix}0{suffix}
    </span>
  );
}

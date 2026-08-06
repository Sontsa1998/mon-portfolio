"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  y?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

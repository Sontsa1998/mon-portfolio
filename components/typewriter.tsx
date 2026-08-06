"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({
  words,
  className,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1800,
}: {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(prefersReducedMotion ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) return;

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeout = setTimeout(
        () => setText(next),
        deleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    prefersReducedMotion,
  ]);

  return (
    <span className={className}>
      {text}
      <span aria-hidden className="ml-0.5 animate-pulse text-[var(--accent-to)]">
        |
      </span>
    </span>
  );
}

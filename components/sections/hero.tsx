"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";
import { HeroBackground } from "@/components/sections/hero-background";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          className="inline-block"
          aria-hidden
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-6 pt-24"
    >
      <HeroBackground />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t("greeting")}
        </motion.p>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <AnimatedTitle text={t("name")} />
          <span className="text-gradient">.</span>
        </h1>

        <div className="mt-4 h-10 text-xl font-semibold text-muted-foreground sm:text-2xl md:h-12 md:text-3xl">
          <Typewriter words={roles} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="cursor-hover rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] px-6 text-white hover:opacity-90"
          >
            <Link href="/projects">
              {t("ctaProjects")}
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="cursor-hover rounded-full px-6"
          >
            <Link href="/contact">
              <Mail className="mr-1.5 size-4" />
              {t("ctaContact")}
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
        }}
        className="absolute bottom-8 flex flex-col items-center gap-1.5 text-xs text-muted-foreground"
      >
        <span>{t("scrollHint")}</span>
        <ArrowDown className="size-4" />
      </motion.div>
    </section>
  );
}

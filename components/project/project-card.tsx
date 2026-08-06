"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/tech-icon";
import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/projects/${project.slug}`} className="cursor-hover group block">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-[var(--accent-to)]/10"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <motion.div
            layoutId={`project-cover-${project.slug}`}
            className="absolute inset-0"
          >
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <TechIcon
                  key={tech}
                  name={tech}
                  className="size-7 border-white/20 bg-white/15 text-white backdrop-blur-sm hover:border-white/40 hover:text-white"
                />
              ))}
            </div>
          </div>
          {project.isPlaceholder && (
            <Badge className="absolute right-3 top-3 bg-black/60 text-white">
              {t("placeholderBadge")}
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <Badge variant="secondary" className="w-fit text-xs">
            {t(`categories.${project.category}`)}
          </Badge>
          <h3 className="text-lg font-semibold leading-snug">
            {project.title[locale]}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.summary[locale]}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

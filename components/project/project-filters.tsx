"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectGridAnimated } from "@/components/project/project-grid-animated";
import { getTechIcon } from "@/lib/tech-icons";
import type { Project, ProjectCategory } from "@/lib/types";

export function ProjectFilters({
  projects,
  categories,
  tags,
}: {
  projects: Project[];
  categories: ProjectCategory[];
  tags: string[];
}) {
  const t = useTranslations("projects");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [tech, setTech] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (tech && !p.stack.includes(tech)) return false;
      return true;
    });
  }, [projects, category, tech]);

  const hasFilters = category !== null || tech !== null;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t("filterCategory")}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={category === null}
              onClick={() => setCategory(null)}
            >
              {t("filterAll")}
            </FilterPill>
            {categories.map((c) => (
              <FilterPill
                key={c}
                active={category === c}
                onClick={() => setCategory(category === c ? null : c)}
              >
                {t(`categories.${c}`)}
              </FilterPill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t("filterTech")}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TechFilterPill
                key={tag}
                name={tag}
                active={tech === tag}
                onClick={() => setTech(tech === tag ? null : tag)}
              />
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={() => {
              setCategory(null);
              setTech(null);
            }}
            className="cursor-hover inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3.5" />
            {t("resetFilters")}
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <ProjectGridAnimated
          projects={filtered}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        />
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center text-muted-foreground"
        >
          {t("noResults")}
        </motion.p>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "cursor-hover rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-transparent bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-white"
          : "border-border text-muted-foreground hover:border-[var(--accent-to)]/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function TechFilterPill({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
}) {
  const entry = getTechIcon(name);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-pressed={active}
          aria-label={name}
          className={cn(
            "cursor-hover relative inline-flex size-9 origin-center scale-100 items-center justify-center rounded-lg border transition-[transform,color,border-color,background-color] duration-300 ease-out hover:z-10 hover:scale-150 focus-visible:z-10 focus-visible:scale-150",
            active
              ? "border-transparent bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-white"
              : "border-border bg-muted/50 text-foreground/75 hover:border-[var(--accent-to)]/60 hover:text-[var(--accent-to)]",
          )}
        >
          {entry.kind === "brand" ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
              <path d={entry.icon.path} />
            </svg>
          ) : (
            <entry.icon className="size-5" aria-hidden />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
}

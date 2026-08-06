import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

type TimelineEntry = { period: string; title: string; description: string };

export function Timeline() {
  const t = useTranslations("about");
  const entries = t.raw("timeline") as TimelineEntry[];

  return (
    <div>
      <ScrollReveal>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          {t("timelineTitle")}
        </h2>
      </ScrollReveal>

      <div className="relative space-y-8 border-l border-border pl-8">
        {entries.map((entry, i) => (
          <ScrollReveal key={entry.title} delay={i * 0.08} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-to)]">
              {entry.period}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

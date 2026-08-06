import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getAllProjects } from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/lib/types";

export function Stats() {
  const t = useTranslations("stats");
  const total = getAllProjects().length;

  const items = [
    { value: total, suffix: "+", label: t("projects") },
    { value: 2.6, suffix: "x", label: t("prAuc") },
    { value: 62, suffix: "", label: t("features") },
    { value: PROJECT_CATEGORIES.length, suffix: "", label: t("categories") },
  ];

  return (
    <section className="border-y border-border px-6 py-16">
      <ScrollReveal className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-4xl font-extrabold text-gradient sm:text-5xl">
              <AnimatedCounter value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}

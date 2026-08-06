import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TechIcon } from "@/components/tech-icon";
import { skillGroups } from "@/lib/skills";

export function SkillsPreview() {
  const t = useTranslations("skills");

  return (
    <section className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
            {t("kicker")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <ScrollReveal
              key={group.category}
              delay={i * 0.06}
              className="glass rounded-2xl p-6"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--accent-to)]">
                {t(`categories.${group.category}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechIcon key={item} name={item} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

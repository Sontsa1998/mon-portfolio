import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProjectGridAnimated } from "@/components/project/project-grid-animated";
import type { Project } from "@/lib/types";

export function OtherProjects({
  projects,
  currentSlug,
}: {
  projects: Project[];
  currentSlug: string;
}) {
  const t = useTranslations("projectDetail");
  const others = projects.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("otherProjects")}
          </h2>
        </ScrollReveal>
        <ProjectGridAnimated
          projects={others}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </section>
  );
}

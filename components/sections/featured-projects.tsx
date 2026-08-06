import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProjectGridAnimated } from "@/components/project/project-grid-animated";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedProjects() {
  const t = useTranslations("projects");
  const projects = getFeaturedProjects().slice(0, 4);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
              {t("kicker")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("titleHome")}
            </h2>
          </div>
          <Button asChild variant="ghost" className="cursor-hover group">
            <Link href="/projects">
              {t("viewAll")}
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </ScrollReveal>

        <ProjectGridAnimated
          projects={projects}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </section>
  );
}

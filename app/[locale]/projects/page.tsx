import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProjectFilters } from "@/components/project/project-filters";
import { getAllProjects, getAllStackTags } from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const projects = getAllProjects();
  const tags = getAllStackTags();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <ScrollReveal className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
          {t("kicker")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("titleList")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
          {t("subtitle")}
        </p>
      </ScrollReveal>

      <ProjectFilters
        projects={projects}
        categories={PROJECT_CATEGORIES}
        tags={tags}
      />
    </div>
  );
}

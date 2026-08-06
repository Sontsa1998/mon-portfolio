import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ReadingProgress } from "@/components/reading-progress";
import { ProjectDetail } from "@/components/project/project-detail";
import { OtherProjects } from "@/components/project/other-projects";
import { ProjectJsonLd } from "@/components/json-ld";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  const projects = getAllProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const loc = locale as Locale;

  return {
    title: project.title[loc],
    description: project.summary[loc],
    openGraph: {
      title: project.title[loc],
      description: project.summary[loc],
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const loc = locale as Locale;
  const allProjects = getAllProjects();

  return (
    <>
      <ReadingProgress />
      <ProjectJsonLd
        title={project.title[loc]}
        description={project.summary[loc]}
        slug={project.slug}
        stack={project.stack}
      />
      <ProjectDetail project={project} />
      <OtherProjects projects={allProjects} currentSlug={project.slug} />
    </>
  );
}

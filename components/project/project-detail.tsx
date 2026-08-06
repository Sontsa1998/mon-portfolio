"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, ExternalLink, FileText, Clock, AlertTriangle } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/tech-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MetricsPanel } from "@/components/project/metrics-panel";
import { ArchitectureDiagram } from "@/components/project/architecture-diagram";
import type { Project, Locale } from "@/lib/types";

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations("projectDetail");
  const tCategories = useTranslations("projects");
  const locale = useLocale() as Locale;
  const hasLinks = Boolean(
    project.links?.github || project.links?.demo || project.links?.caseStudyPdf,
  );

  return (
    <article>
      <header className="px-6 pt-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="cursor-hover mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t("back")}
          </Link>
          <ScrollReveal>
            <Badge variant="secondary" className="mb-4">
              {tCategories(`categories.${project.category}`)}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {project.title[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
              {project.summary[locale]}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.timeline && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  {project.timeline}
                </span>
              )}
              {hasLinks && (
                <div className="flex items-center gap-3">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cursor-hover inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-to)] hover:underline"
                    >
                      <GithubIcon className="size-4" />
                      {t("github")}
                    </a>
                  )}
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cursor-hover inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-to)] hover:underline"
                    >
                      <ExternalLink className="size-4" />
                      {t("demo")}
                    </a>
                  )}
                  {project.links?.caseStudyPdf && (
                    <a
                      href={project.links.caseStudyPdf}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cursor-hover inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-to)] hover:underline"
                    >
                      <FileText className="size-4" />
                      {t("caseStudy")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>

          {project.isPlaceholder && (
            <ScrollReveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <p>{t("placeholderNotice")}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </header>

      <ScrollReveal delay={0.15} className="px-6 pt-10">
        <motion.div
          layoutId={`project-cover-${project.slug}`}
          className="glass relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl"
        >
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </ScrollReveal>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {(["overview", "approach", "metrics", "challenges", "gallery"] as const)
              .filter(
                (tab) =>
                  tab !== "gallery" ||
                  project.gallery.length > 0 ||
                  project.architectureDiagram,
              )
              .map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="cursor-hover rounded-full border border-border px-4 py-2 text-sm data-[state=active]:border-transparent data-[state=active]:bg-gradient-to-br data-[state=active]:from-[var(--accent-from)] data-[state=active]:to-[var(--accent-to)] data-[state=active]:text-white"
                >
                  {t(`tabs.${tab}`)}
                </TabsTrigger>
              ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Section title={t("context")}>{project.context[locale]}</Section>
            {project.stack.length > 0 && (
              <Section title={t("stack")}>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechIcon key={tech} name={tech} />
                  ))}
                </div>
              </Section>
            )}
          </TabsContent>

          <TabsContent value="approach" className="space-y-8">
            <Section title={t("approach")}>{project.approach[locale]}</Section>
            <Section title={t("architecture")}>
              {project.architecture[locale]}
            </Section>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-8">
            <MetricsPanel metrics={project.metrics} />
            <Section title={t("results")}>{project.results[locale]}</Section>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-8">
            <Section title={t("challenges")}>
              {project.challenges[locale]}
            </Section>
          </TabsContent>

          {(project.gallery.length > 0 || project.architectureDiagram) && (
            <TabsContent value="gallery" className="space-y-10">
              {project.architectureDiagram && (
                <Section title={t("architectureDiagramTitle")}>
                  <ArchitectureDiagram definition={project.architectureDiagram[locale]} />
                </Section>
              )}
              {project.gallery.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.gallery.map((src) => (
                    <div
                      key={src}
                      className="glass relative aspect-video overflow-hidden rounded-xl"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      {typeof children === "string" ? (
        <p className="text-balance leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
}

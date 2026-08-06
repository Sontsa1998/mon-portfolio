import type { Metadata } from "next";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/sections/timeline";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { TechIcon } from "@/components/tech-icon";
import { skillGroups } from "@/lib/skills";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tSkills = await getTranslations("skills");

  return (
    <div className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[280px_1fr]">
          <ScrollReveal className="lg:sticky lg:top-28">
            <div className="glass relative mx-auto aspect-[3/4] w-56 overflow-hidden rounded-3xl lg:w-full">
              <Image
                src="/chris.png"
                alt="Christian Sontsa Kiteu"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" />
                Paris, France
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Sontsa1998"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="cursor-hover text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/csontsakiteu"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="cursor-hover text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LinkedinIcon className="size-5" />
                </a>
              </div>
              <Button asChild className="cursor-hover w-full rounded-full">
                <a href="/cv/CV_Christian_SONTSA_KITEU.pdf" download>
                  <Download className="mr-1.5 size-4" />
                  {t("downloadCv")}
                </a>
              </Button>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("languagesTitle")}
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center justify-between">
                  <span>{t("french")}</span>
                  <Badge variant="secondary">{t("nativeLevel")}</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>{t("english")}</span>
                  <Badge variant="secondary">{t("c1Level")}</Badge>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            <ScrollReveal>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
                {t("kicker")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-5 text-balance leading-relaxed text-muted-foreground">
                {t("intro")}
              </p>
            </ScrollReveal>

            <Timeline />

            <div>
              <ScrollReveal>
                <h2 className="mb-8 text-2xl font-bold tracking-tight">
                  {tSkills("title")}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {skillGroups.map((group, i) => (
                  <ScrollReveal
                    key={group.category}
                    delay={i * 0.06}
                    className="glass rounded-2xl p-6"
                  >
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--accent-to)]">
                      {tSkills(`categories.${group.category}`)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

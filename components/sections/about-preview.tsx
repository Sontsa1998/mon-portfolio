import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MapPin, GraduationCap, Globe2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutPreview() {
  const t = useTranslations("about");

  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,380px)_1fr]">
        <ScrollReveal className="mx-auto w-56 lg:w-full">
          <div className="glass relative mx-auto aspect-[3/4] w-56 overflow-hidden rounded-3xl lg:w-full">
            <Image
              src="/chris.png"
              alt="Christian Sontsa Kiteu"
              fill
              sizes="(min-width: 1024px) 380px, 224px"
              className="object-cover"
              priority={false}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
            {t("kicker")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-balance leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-xl p-4">
              <Globe2 className="mb-2 size-5 text-[var(--accent-to)]" />
              <p className="text-sm font-semibold">{t("intlTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("intlText")}
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <GraduationCap className="mb-2 size-5 text-[var(--accent-to)]" />
              <p className="text-sm font-semibold">{t("searchTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("searchText")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="cursor-hover rounded-full group">
              <Link href="/about">
                {t("readMore")}
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              Paris, France
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

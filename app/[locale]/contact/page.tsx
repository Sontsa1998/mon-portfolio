import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="px-6 pb-24 pt-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
        <ScrollReveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-to)]">
            {t("kicker")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("directTitle")}
            </p>
            <a
              href="mailto:sontsachristian@gmail.com"
              className="cursor-hover flex items-center gap-3 text-sm transition-colors hover:text-[var(--accent-to)]"
            >
              <Mail className="size-4" />
              sontsachristian@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/csontsakiteu"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-hover flex items-center gap-3 text-sm transition-colors hover:text-[var(--accent-to)]"
            >
              <LinkedinIcon className="size-4" />
              linkedin.com/in/csontsakiteu
            </a>
            <a
              href="https://github.com/Sontsa1998"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-hover flex items-center gap-3 text-sm transition-colors hover:text-[var(--accent-to)]"
            >
              <GithubIcon className="size-4" />
              github.com/Sontsa1998
            </a>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {t("location")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="glass rounded-2xl p-6 sm:p-8">
          <ContactForm />
        </ScrollReveal>
      </div>
    </div>
  );
}

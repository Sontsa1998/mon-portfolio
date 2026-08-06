import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { AboutPreview } from "@/components/sections/about-preview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <Hero />
      <Stats />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
      <ContactCta />
    </>
  );
}

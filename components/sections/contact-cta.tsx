import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";

export function ContactCta() {
  const t = useTranslations("contact");

  return (
    <section className="px-6 py-24">
      <ScrollReveal className="glass bg-grid relative mx-auto flex max-w-5xl flex-col items-center overflow-hidden rounded-3xl px-8 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, var(--accent-from), transparent 60%)",
          }}
        />
        <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="relative mt-4 max-w-xl text-balance text-muted-foreground">
          {t("subtitle")}
        </p>
        <Button
          asChild
          size="lg"
          className="cursor-hover relative mt-8 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] px-7 text-white hover:opacity-90"
        >
          <Link href="/contact">
            {t("kicker")}
            <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </Button>
      </ScrollReveal>
    </section>
  );
}

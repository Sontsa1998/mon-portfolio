import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollReveal } from "@/components/scroll-reveal";

export function Stats() {
  const t = useTranslations("stats");

  const items = [
    { value: 5, suffix: "+", label: t("aiSystems") },
    { value: 6, suffix: "", label: t("llmFrameworks") },
    { value: 20, suffix: "M+", label: t("documentsIndexed") },
    { value: 90.9, suffix: "%", label: t("pipelineReliability") },
    { value: 35, suffix: "%", label: t("costReduction") },
    { value: 5, suffix: "x", label: t("fasterInference") },
  ];

  return (
    <section className="border-y border-border px-6 py-16">
      <ScrollReveal className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-4xl font-extrabold text-gradient sm:text-5xl">
              <AnimatedCounter value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}

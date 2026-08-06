"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { ProjectMetric, Locale } from "@/lib/types";

function parseGaugePercent(value: string): number | null {
  const ratio = value.match(/^(\d(?:\.\d+)?)\s*$/);
  if (ratio) {
    const n = parseFloat(ratio[1]);
    if (n <= 1) return n * 100;
  }
  const percent = value.match(/^(\d+(?:\.\d+)?)\s*%/);
  if (percent) return parseFloat(percent[1]);
  return null;
}

function parseLeadingNumber(value: string): { n: number; decimals: number } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const raw = match[1];
  return { n: parseFloat(raw), decimals: raw.includes(".") ? raw.split(".")[1].length : 0 };
}

function EstimatedBadge() {
  const t = useTranslations("projectDetail");
  return (
    <span className="mt-2 inline-flex items-center rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
      {t("estimated")}
    </span>
  );
}

function MetricImpact({ metric, locale }: { metric: ProjectMetric; locale: Locale }) {
  if (!metric.impact) return null;
  return (
    <p className="mt-3 border-t border-border pt-3 text-left text-xs leading-relaxed text-muted-foreground">
      {metric.impact[locale]}
    </p>
  );
}

function MetricGauge({ metric, locale }: { metric: ProjectMetric; locale: Locale }) {
  const percent = parseGaugePercent(metric.value);
  const data = [{ value: percent ?? 0, fill: "var(--accent-to)" }];

  return (
    <div className="glass flex h-full flex-col items-center rounded-2xl p-6 text-center">
      <div className="relative size-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              background={{ fill: "var(--muted)" }}
              cornerRadius={20}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          <AnimatedCounter value={percent ?? 0} suffix="%" duration={1.4} />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium">{metric.label}</p>
      <p className="text-xs text-muted-foreground">{metric.value}</p>
      {metric.estimated && <EstimatedBadge />}
      <MetricImpact metric={metric} locale={locale} />
    </div>
  );
}

function MetricStat({ metric, locale }: { metric: ProjectMetric; locale: Locale }) {
  const parsed = parseLeadingNumber(metric.value);
  return (
    <div className="glass flex h-full flex-col items-center justify-start rounded-2xl p-6 text-center">
      <p className="text-3xl font-extrabold text-gradient">
        {parsed ? (
          <AnimatedCounter
            value={parsed.n}
            duration={1.4}
            className=""
          />
        ) : (
          metric.value
        )}
      </p>
      {parsed && (
        <p className="text-xs text-muted-foreground">{metric.value}</p>
      )}
      <p className="mt-2 text-sm font-medium">{metric.label}</p>
      {metric.estimated && <EstimatedBadge />}
      <MetricImpact metric={metric} locale={locale} />
    </div>
  );
}

export function MetricsPanel({ metrics }: { metrics: ProjectMetric[] }) {
  const locale = useLocale() as Locale;
  if (metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, i) => {
        const gaugePercent = parseGaugePercent(metric.value);
        return (
          <ScrollReveal key={metric.label} delay={i * 0.08} className="h-full">
            {gaugePercent !== null ? (
              <MetricGauge metric={metric} locale={locale} />
            ) : (
              <MetricStat metric={metric} locale={locale} />
            )}
          </ScrollReveal>
        );
      })}
    </div>
  );
}

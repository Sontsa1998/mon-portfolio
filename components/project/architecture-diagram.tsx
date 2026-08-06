"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import type { Locale } from "@/lib/types";

/** Mermaid's color engine (khroma) only understands legacy 8-bit rgb()/hex colors —
 * not var(), color-mix(), or the lab()/oklch() strings modern browsers now return from
 * getComputedStyle. Resolve through a live element first (for var()/color-mix()), then
 * force the result down to plain sRGB via a 1x1 canvas readback. */
function resolveCssColor(expression: string): string {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.color = expression;
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return computed;
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

function buildThemeVariables() {
  return {
    background: resolveCssColor("var(--background)"),
    primaryColor: resolveCssColor(
      "color-mix(in oklab, var(--accent-to) 14%, var(--card))",
    ),
    primaryTextColor: resolveCssColor("var(--foreground)"),
    primaryBorderColor: resolveCssColor(
      "color-mix(in oklab, var(--accent-to) 55%, var(--border))",
    ),
    secondaryColor: resolveCssColor("var(--muted)"),
    tertiaryColor: resolveCssColor("var(--muted)"),
    lineColor: resolveCssColor("var(--accent-to)"),
    textColor: resolveCssColor("var(--foreground)"),
    clusterBkg: resolveCssColor(
      "color-mix(in oklab, var(--accent-from) 6%, transparent)",
    ),
    clusterBorder: resolveCssColor("var(--border)"),
    edgeLabelBackground: resolveCssColor("var(--background)"),
    fontFamily: "var(--font-sans)",
  };
}

export function ArchitectureDiagram({ definition }: { definition: string }) {
  const locale = useLocale() as Locale;
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        themeVariables: buildThemeVariables(),
        flowchart: { curve: "basis", htmlLabels: false, padding: 16 },
      });

      try {
        const { svg } = await mermaid.render(
          `arch-${id}-${resolvedTheme}`,
          definition,
        );
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [inView, id, definition, resolvedTheme]);

  return (
    <div ref={inViewRef} className="glass architecture-diagram overflow-x-auto rounded-2xl p-6">
      <div ref={containerRef} className="flex min-h-[200px] min-w-fit items-center justify-center" />
      {inView && status === "idle" && (
        <p className="text-center text-sm text-muted-foreground">…</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-muted-foreground">
          {locale === "fr"
            ? "Le schéma n'a pas pu être chargé."
            : "The diagram could not be loaded."}
        </p>
      )}
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: string) {
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
    router.replace(
      // @ts-expect-error dynamic route params
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border p-1 text-xs font-medium",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          className={cn(
            "cursor-hover rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === loc
              ? "bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-white"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={locale === loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}

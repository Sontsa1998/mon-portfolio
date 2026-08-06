"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-lg shadow-black/5" : "py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="cursor-hover text-lg font-bold tracking-tight"
        >
          Christian<span className="text-gradient">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "cursor-hover relative text-sm font-medium transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t(item.key)}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="cursor-hover rounded-full">
            <a href="/cv/CV_Christian_SONTSA_KITEU.pdf" download>
              <Download className="mr-1.5 size-4" />
              {t("downloadCv")}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/98 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-accent"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between px-3">
                <LanguageSwitcher />
                <a
                  href="/cv/CV_Christian_SONTSA_KITEU.pdf"
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-to)]"
                >
                  <Download className="size-4" />
                  {t("downloadCv")}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

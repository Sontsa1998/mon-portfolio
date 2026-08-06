import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="cursor-hover text-lg font-bold">
            Christian<span className="text-gradient">.</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
          <a
            href="mailto:sontsachristian@gmail.com"
            aria-label="Email"
            className="cursor-hover text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-5" />
          </a>
        </div>

        <a
          href="#top"
          className="cursor-hover inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("backToTop")}
          <ArrowUp className="size-4" />
        </a>
      </div>
      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        © {year} Christian Sontsa Kiteu. {t("rights")}
      </div>
    </footer>
  );
}

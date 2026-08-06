import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("nav");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-gradient text-6xl font-extrabold">404</p>
      <p className="mt-4 max-w-sm text-muted-foreground">
        {t("home")} · {t("projects")}
      </p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}

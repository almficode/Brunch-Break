"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = { es: "ES", en: "EN" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "flex items-center gap-1 rounded-full border border-ink/15 p-1 font-sans text-xs",
        className
      )}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={locale === loc}
          className={cn(
            "rounded-full px-3 py-1.5 tracking-wide transition-colors duration-300",
            locale === loc
              ? "bg-ink text-cream"
              : "text-ink/60 hover:text-ink"
          )}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function LocaleNotFound() {
  const t = useTranslations("nav");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-rust">404</p>
      <h1 className="font-display text-4xl text-ink md:text-6xl">
        Esta página se ha tomado un descanso.
      </h1>
      <Link
        href="/"
        className="rounded-full bg-ink px-7 py-3.5 font-sans text-sm text-cream transition-colors hover:bg-rust"
      >
        {t("menuCta")}
      </Link>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Instagram, ArrowUp } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/content/site-config";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="container py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl md:text-4xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm font-sans text-sm text-cream/60">
              {t("tagline")}
            </p>
            <a
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-6 inline-flex items-center gap-2 font-sans text-sm text-cream/80 hover:text-honey"
            >
              <Instagram aria-hidden className="h-4 w-4" />
              {siteConfig.social.instagram.handle}
            </a>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-cream/40">
              {tNav("menu")}
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              {["story", "philosophy", "gallery", "menu", "contact"].map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="text-cream/70 hover:text-cream">
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-cream/40">
              {t("legalLinks")}
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              <li>
                <Link href="/legal/privacidad" className="text-cream/70 hover:text-cream">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-cream/70 hover:text-cream">
                  {t("cookies")}
                </Link>
              </li>
              <li>
                <Link href="/legal/aviso-legal" className="text-cream/70 hover:text-cream">
                  {t("legalNotice")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row">
          <p className="font-sans text-xs text-cream/40">
            © {year} {siteConfig.name}. {t("rights")} · {t("madeWith")}
          </p>
          <MagneticButton href="#top" variant="ghost" className="text-cream/70 hover:text-cream" ariaLabel={t("backToTop")}>
            {t("backToTop")}
            <ArrowUp aria-hidden className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

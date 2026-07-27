"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "story", key: "story" },
  { id: "philosophy", key: "philosophy" },
  { id: "specialties", key: "specialties" },
  { id: "gallery", key: "gallery" },
  { id: "menu", key: "menu" },
  { id: "reviews", key: "reviews" },
  { id: "location", key: "location" },
  { id: "contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-premium",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(28,23,18,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between py-4">
        <a
          href="#top"
          data-cursor="link"
          className="font-display text-xl font-medium tracking-tight text-ink"
        >
          The Brunch Break
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="link"
              className="font-sans text-[13px] uppercase tracking-[0.14em] text-ink/70 transition-colors duration-300 hover:text-rust"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <MagneticButton href="#contact" variant="primary" className="px-5 py-2.5 text-xs">
            {t("reserveCta")}
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="text-ink lg:hidden"
        >
          <Menu aria-hidden className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
          >
            <div className="container flex items-center justify-between py-4">
              <span className="font-display text-xl font-medium text-ink">
                {siteConfig.name}
              </span>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMobileOpen(false)}
                className="text-ink"
              >
                <X aria-hidden className="h-6 w-6" />
              </button>
            </div>

            <nav
              aria-label="Menú móvil"
              className="container flex flex-1 flex-col justify-center gap-2"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="border-b border-ink/10 py-4 font-display text-3xl text-ink"
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </nav>

            <div className="container flex items-center justify-between py-6">
              <LanguageSwitcher />
              <MagneticButton
                href={siteConfig.menu.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                {t("menuCta")}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

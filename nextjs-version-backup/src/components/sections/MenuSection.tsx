"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Croissant, Salad, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { siteConfig } from "@/content/site-config";

const ICONS = [UtensilsCrossed, Salad, Croissant, Coffee];

export function MenuSection() {
  const t = useTranslations("menu");
  const categories = t.raw("categories") as { name: string; description: string }[];

  return (
    <section id="menu" className="bg-cream py-24 md:py-36">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink/65"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mt-10"
            >
              <MagneticButton
                href={siteConfig.menu.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="text-base"
              >
                {t("ctaLabel")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </MagneticButton>
              <p className="mt-3 font-sans text-xs text-ink/40">{t("ctaNote")}</p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1, 0.05)}
            className="grid grid-cols-2 gap-4"
          >
            {categories.map((category, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div
                  key={category.name}
                  variants={fadeUp}
                  whileHover={{ y: -6, backgroundColor: "rgba(180,71,46,0.06)" }}
                  className="rounded-3xl border border-ink/10 p-7 transition-colors"
                >
                  <Icon className="h-7 w-7 text-rust" strokeWidth={1.25} aria-hidden />
                  <h3 className="mt-5 font-display text-xl text-ink">{category.name}</h3>
                  <p className="mt-2 font-sans text-sm text-ink/55">{category.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { storyImage } from "@/content/products";

export function Story() {
  const t = useTranslations("story");
  const paragraphs = t.raw("paragraphs") as string[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="story" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="container grid gap-14 md:grid-cols-2 md:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <MediaPlaceholder tone={storyImage.tone} label="Foto: interior / mesa de sala (sustituir)" className="h-full w-full" />
        </div>

        <div className="flex flex-col justify-center">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.15, 0.1)}
            className="mt-6 space-y-5"
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                className="font-sans text-base leading-relaxed text-ink/70 md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rust/10 font-display text-lg text-rust">
              LH
            </div>
            <div>
              <p className="font-sans text-sm font-medium text-ink">{t("founderName")}</p>
              <p className="font-sans text-xs text-ink/50">
                {t("founderLabel")} · {t("founderRole")}
              </p>
            </div>
          </motion.div>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12, 0.2)}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <dt className="font-display text-2xl text-ink md:text-3xl">{stat.value}</dt>
                <dd className="mt-1 font-sans text-[11px] uppercase tracking-wide text-ink/50">
                  {stat.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

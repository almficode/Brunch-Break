"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

type Review = { quote: string; author: string; source: string };

export function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Review[];

  return (
    <section id="reviews" className="bg-cream py-24 md:py-36">
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {items.map((review) => (
            <motion.figure
              key={review.author}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-3xl border border-ink/10 bg-white/40 p-8 shadow-[0_20px_50px_-35px_rgba(28,23,18,0.4)]"
            >
              <Quote className="h-7 w-7 text-honey" aria-hidden />
              <blockquote className="mt-5 flex-1 font-display text-lg leading-snug text-ink">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="font-sans text-sm font-medium text-ink">{review.author}</span>
                <span className="flex items-center gap-1 font-sans text-xs text-ink/45">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-honey text-honey" aria-hidden />
                  ))}
                  <span className="ml-1">{review.source}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-8 text-center font-sans text-xs italic text-ink/35">
          {t("placeholderNote")}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Leaf, Croissant, HeartPulse, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const ICONS = [Leaf, Croissant, HeartPulse, Clock];

export function Philosophy() {
  const t = useTranslations("philosophy");
  const pillars = t.raw("pillars") as { title: string; description: string }[];

  return (
    <section id="philosophy" className="bg-ink py-24 text-cream md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            eyebrowClassName="text-honey"
            titleClassName="text-cream"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6 font-sans text-base leading-relaxed text-cream/60 md:text-lg"
          >
            {t("intro")}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-3xl border border-cream/10 p-7 transition-colors duration-500 hover:bg-cream/[0.04]"
              >
                <Icon className="h-8 w-8 text-honey" strokeWidth={1.25} aria-hidden />
                <h3 className="mt-6 font-display text-xl text-cream">{pillar.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream/55">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

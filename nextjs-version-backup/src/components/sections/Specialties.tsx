"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { fadeUp, viewportOnce } from "@/animations/variants";
import { specialtyImages } from "@/content/products";

export function Specialties() {
  const t = useTranslations("specialties");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="specialties" className="bg-cream py-24 md:py-36">
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[1.75rem]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MediaPlaceholder
                    tone={specialtyImages[index % specialtyImages.length].tone}
                    label={`Foto: ${item.title} (sustituir)`}
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-2xl text-cream md:text-3xl">{item.title}</h3>
                <p className="mt-2 max-w-sm font-sans text-sm text-cream/75">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { galleryItems, instagramReels } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";

const HIGHLIGHT_TAGS = [
  "Party Donuts",
  "Fit & Go",
  "Bakery & Coffee",
  "Catering",
  "The New TBB",
  "Merchan",
];

export function InstagramSection() {
  const t = useTranslations("instagram");
  const gridItems = galleryItems.slice(0, 6);

  return (
    <section id="instagram" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} className="max-w-xl" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex flex-col items-start gap-3"
          >
            <p className="font-sans text-sm text-ink/60">
              {t("handle")} · {t("followers")}
            </p>
            <MagneticButton
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Instagram className="h-4 w-4" aria-hidden />
              {t("cta")}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06, 0.1)}
          className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <MediaPlaceholder tone={item.tone} label={`${item.labelEs} (sustituir)`} className="h-full w-full" reveal={false} />
              {index === 2 && (
                <div className="absolute right-3 top-3 rounded-full bg-ink/60 p-1.5 backdrop-blur-sm">
                  <Play className="h-3.5 w-3.5 fill-cream text-cream" aria-hidden />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-6 max-w-md text-center font-sans text-xs italic text-ink/35">
          {t("placeholderNote")}
        </p>
      </div>

      <div className="mt-16 border-y border-ink/10 bg-ink py-6">
        <Marquee items={HIGHLIGHT_TAGS} />
      </div>

      <span className="sr-only">
        {instagramReels.map((reel) => reel.labelEs).join(", ")}
      </span>
    </section>
  );
}

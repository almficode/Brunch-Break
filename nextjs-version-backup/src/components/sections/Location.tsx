"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, viewportOnce } from "@/animations/variants";
import { siteConfig } from "@/content/site-config";

export function Location() {
  const t = useTranslations("location");
  const mapQuery = encodeURIComponent(
    `${siteConfig.name}, ${siteConfig.location.city}, ${siteConfig.location.region}`
  );

  return (
    <section id="location" className="bg-ink py-24 text-cream md:py-36">
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            titleClassName="text-cream"
            eyebrowClassName="text-honey"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-8 space-y-6"
          >
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-honey" aria-hidden />
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream/40">
                  {t("addressLabel")}
                </p>
                <p className="mt-1 font-sans text-base text-cream/85">{t("address")}</p>
                <p className="mt-1 font-sans text-xs italic text-cream/35">{t("addressNote")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-honey" aria-hidden />
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream/40">
                  {t("hoursLabel")}
                </p>
                <p className="mt-1 font-sans text-base text-cream/85">{t("hours")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-9"
          >
            <MagneticButton
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
            >
              {t("mapCta")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-cream/10"
        >
          <iframe
            title="Mapa — The Brunch Break, Arrecife"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full w-full grayscale invert-[0.92] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

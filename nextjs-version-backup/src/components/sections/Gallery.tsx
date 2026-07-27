"use client";

import { useTranslations } from "next-intl";
import { Instagram } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { galleryItems } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { cn } from "@/lib/utils";

const SPAN_CLASSES: Record<string, string> = {
  tall: "h-[420px] md:h-[560px]",
  square: "h-[420px] md:h-[460px]",
  wide: "h-[420px] md:h-[460px]",
};

const WIDTH_CLASSES: Record<string, string> = {
  tall: "w-[280px] md:w-[360px]",
  square: "w-[300px] md:w-[380px]",
  wide: "w-[360px] md:w-[520px]",
};

export function Gallery() {
  const t = useTranslations("gallery");
  const { sectionRef, trackRef } = useHorizontalScroll<HTMLDivElement, HTMLDivElement>();

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-24 text-cream md:h-screen md:py-0"
    >
      <div className="md:absolute md:inset-0 md:flex md:flex-col md:justify-center">
        <Container className="mb-10 md:mb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              titleClassName="text-cream"
              eyebrowClassName="text-honey"
              className="max-w-xl"
            />
            <p className="max-w-xs font-sans text-sm text-cream/55">{t("subtitle")}</p>
          </div>
        </Container>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 will-change-transform [scrollbar-width:none] md:snap-none md:overflow-visible md:px-[max(1.5rem,calc((100vw-1400px)/2))] [&::-webkit-scrollbar]:hidden"
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "relative shrink-0 snap-center overflow-hidden rounded-2xl",
                SPAN_CLASSES[item.span],
                WIDTH_CLASSES[item.span]
              )}
            >
              <MediaPlaceholder tone={item.tone} label={`${item.labelEs} (sustituir)`} className="h-full w-full" />
            </div>
          ))}

          <div className="flex shrink-0 items-center pr-10">
            <MagneticButton
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="whitespace-nowrap border-cream/30 text-cream hover:bg-cream hover:text-ink"
            >
              <Instagram className="h-4 w-4" aria-hidden />
              {t("cta")}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

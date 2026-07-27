"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, Coffee, Croissant } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { siteConfig } from "@/content/site-config";
import { gsap, registerGsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const t = useTranslations("hero");
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !bgRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <div ref={bgRef} className="absolute inset-0 scale-[1.15]">
        <MediaPlaceholder
          tone="rust"
          label="Foto/vídeo hero: brunch signature en mesa (sustituir)"
          className="h-full w-full"
          reveal={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" aria-hidden />

      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[22%] hidden text-honey/70 md:block"
        animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Coffee className="h-12 w-12" strokeWidth={1.1} />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute left-[10%] top-[34%] hidden text-cream/40 md:block"
        animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Croissant className="h-16 w-16" strokeWidth={1} />
      </motion.div>

      <div className="container relative z-10 pb-20 pt-40 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-sans text-xs uppercase tracking-[0.32em] text-honey"
        >
          {t("eyebrow")}
        </motion.p>

        <RevealText
          as="h1"
          words={t.raw("headlineWords") as string[]}
          trigger="load"
          delay={0.2}
          className="max-w-4xl font-display text-clamp-hero font-medium leading-[0.98] text-cream"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-lg font-sans text-base text-cream/75 md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={siteConfig.menu.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="bg-honey text-ink hover:bg-cream"
          >
            {t("ctaMenu")}
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-ink">
            {t("ctaContact")}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.28em]">
          {t("scrollHint")}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}

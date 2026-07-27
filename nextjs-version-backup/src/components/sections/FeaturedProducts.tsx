"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Container } from "@/components/ui/Container";
import { featuredImages } from "@/content/products";
import { gsap, registerGsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Product = { name: string; tag: string; description: string };

function StackCard({ product, index, tone }: { product: Product; index: number; tone: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.94,
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top+=96",
            end: "+=280",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      className="sticky top-24 mb-6 md:top-28"
      style={{ zIndex: index + 1 }}
    >
      <div
        ref={cardRef}
        className="grid overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-[0_20px_60px_-25px_rgba(28,23,18,0.35)] md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-[4/3] md:aspect-auto">
          <MediaPlaceholder tone={tone as "rust" | "honey" | "sage" | "ink"} label={`Foto: ${product.name} (sustituir)`} className="h-full w-full" reveal={false} />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="font-sans text-xs uppercase tracking-[0.24em] text-rust">
            {product.tag}
          </span>
          <h3 className="mt-4 font-display text-2xl text-ink md:text-4xl">{product.name}</h3>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-ink/65 md:text-base">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const t = useTranslations("featured");
  const products = t.raw("products") as Product[];

  return (
    <section className="bg-cream pt-24 md:pt-36">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
      </Container>

      <div className="container mt-16 pb-10">
        {products.map((product, index) => (
          <StackCard
            key={product.name}
            product={product}
            index={index}
            tone={featuredImages[index % featuredImages.length].tone}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { RevealText } from "./RevealText";
import { fadeUp, viewportOnce } from "@/animations/variants";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto", className)}>
      {eyebrow && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className={cn("mb-4 font-sans text-xs uppercase tracking-[0.28em] text-rust", eyebrowClassName)}
        >
          {eyebrow}
        </motion.p>
      )}
      <RevealText
        as="h2"
        text={title}
        className={cn(
          "font-display text-clamp-h2 font-medium leading-[1.05] text-ink",
          align === "center" && "justify-center",
          titleClassName
        )}
      />
    </div>
  );
}

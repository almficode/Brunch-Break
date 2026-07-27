"use client";

import { motion } from "framer-motion";
import { EASE_PREMIUM, viewportOnce } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text?: string;
  words?: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  trigger?: "load" | "scroll";
};

/**
 * Divide un texto en palabras y las revela con stagger, cada una enmascarada
 * dentro de un contenedor con overflow-hidden (efecto "cortina" premium).
 * No depende del plugin de pago SplitText de GSAP: es una implementación
 * propia con Framer Motion.
 */
export function RevealText({
  text,
  words,
  as = "p",
  className,
  wordClassName,
  stagger = 0.06,
  delay = 0,
  trigger = "scroll",
}: RevealTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const tokens = words ?? text?.split(" ") ?? [];
  const Tag = motion[as];

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{tokens.join(" ")}</Plain>;
  }

  return (
    <Tag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate={trigger === "load" ? "visible" : undefined}
      whileInView={trigger === "scroll" ? "visible" : undefined}
      viewport={trigger === "scroll" ? viewportOnce : undefined}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {tokens.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="overflow-hidden mr-[0.28em] py-[0.08em]"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.85, ease: EASE_PREMIUM },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

import type { Variants } from "framer-motion";

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_PREMIUM },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE_PREMIUM } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_PREMIUM },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.1, ease: EASE_PREMIUM },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.15 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.3, ease: EASE_PREMIUM },
  },
};

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" };

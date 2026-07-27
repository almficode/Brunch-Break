"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Cursor animado premium: un punto que sigue el ratón con física de resorte
 * y crece/cambia de estado sobre elementos interactivos (data-cursor="link").
 * Se desactiva en touch y con prefers-reduced-motion.
 */
export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(true);
  const [variant, setVariant] = useState<"default" | "link" | "view">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      setVariant((cursorTarget?.dataset.cursor as typeof variant) ?? "default");
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch || prefersReducedMotion) return null;

  const size = variant === "default" ? 10 : variant === "link" ? 52 : 72;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full mix-blend-difference bg-cream"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {variant === "view" && (
        <span className="text-[10px] font-sans uppercase tracking-widest text-ink">
          Ver
        </span>
      )}
    </motion.div>
  );
}

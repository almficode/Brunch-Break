"use client";

import { useScroll, useSpring } from "framer-motion";

/**
 * Progreso de scroll global suavizado con spring, para barras de progreso
 * u otros indicadores de avance en la página.
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
}

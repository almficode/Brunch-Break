"use client";

import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Efecto "magnético": el elemento sigue ligeramente el cursor dentro de su
 * radio de acción y vuelve a su posición con un spring al salir el ratón.
 * Se desactiva automáticamente en touch y con prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = (event: React.MouseEvent<T>) => {
    if (prefersReducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return { ref, onMouseMove, onMouseLeave };
}

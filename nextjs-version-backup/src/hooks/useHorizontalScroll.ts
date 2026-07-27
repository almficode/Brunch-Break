"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Pinea la sección y traduce el track horizontal en función del scroll
 * vertical, para crear un scroll horizontal "pinned" (usado en Galería).
 * Se desactiva con prefers-reduced-motion (scroll horizontal nativo con overflow-x).
 */
export function useHorizontalScroll<TSection extends HTMLElement, TTrack extends HTMLElement>() {
  const sectionRef = useRef<TSection | null>(null);
  const trackRef = useRef<TTrack | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const isPinned = !prefersReducedMotion;

  return { sectionRef, trackRef, prefersReducedMotion, isPinned };
}

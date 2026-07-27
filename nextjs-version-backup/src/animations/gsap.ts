"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registra los plugins de GSAP una única vez en cliente.
 * Llamar dentro de useEffect / useGSAP antes de crear animaciones con ScrollTrigger.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };

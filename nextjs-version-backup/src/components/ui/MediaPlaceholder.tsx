"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { imageReveal, viewportOnce } from "@/animations/variants";

const TONE_GRADIENTS: Record<string, string> = {
  rust: "from-rust-700 via-rust to-honey-400",
  honey: "from-honey-600 via-honey to-rust-400",
  sage: "from-sage to-ink-700",
  ink: "from-ink-700 via-ink to-rust-600",
};

type MediaPlaceholderProps = {
  tone?: "rust" | "honey" | "sage" | "ink";
  label: string;
  className?: string;
  reveal?: boolean;
  priority?: boolean;
};

/**
 * Sustituye a una fotografía real mientras no se disponga de material
 * autorizado del cliente. Muestra un degradado de marca + etiqueta visible
 * indicando qué contenido debe ir ahí, para que sea fácil de localizar y
 * reemplazar (ver README.md → "Sustituir imágenes placeholder").
 *
 * Para reemplazar: borra este componente y usa <Image src="/images/..." fill
 * alt="..." /> apuntando al archivo real en la ruta indicada en content/.
 */
export function MediaPlaceholder({
  tone = "rust",
  label,
  className,
  reveal = true,
}: MediaPlaceholderProps) {
  const content = (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        TONE_GRADIENTS[tone],
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.5), transparent 45%)",
        }}
      />
      <ImageIcon
        aria-hidden
        className="h-10 w-10 text-cream/50 md:h-14 md:w-14"
        strokeWidth={1.25}
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-1 text-[11px] font-sans tracking-wide text-cream backdrop-blur-sm">
        {label}
      </span>
    </div>
  );

  if (!reveal) return content;

  return (
    <motion.div
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={imageReveal}
    >
      {content}
    </motion.div>
  );
}

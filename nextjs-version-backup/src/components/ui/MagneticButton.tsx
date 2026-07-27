"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const VARIANT_STYLES: Record<string, string> = {
  primary: "bg-ink text-cream hover:bg-rust",
  outline: "border border-ink text-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:text-rust",
};

/**
 * Botón con efecto "magnético": se desplaza sutilmente hacia el cursor.
 * Se usa para anclas internas (#seccion) y enlaces externos; para navegación
 * entre páginas (legal) se usa el <Link> de next-intl directamente.
 */
export function MagneticButton({
  href,
  onClick,
  variant = "primary",
  className,
  children,
  target,
  rel,
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement & HTMLAnchorElement>(0.28);

  const sharedClassName = cn(
    "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-medium tracking-wide transition-colors duration-500 ease-premium will-change-transform",
    VARIANT_STYLES[variant],
    className
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={sharedClassName}
        data-cursor="link"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={sharedClassName}
      data-cursor="link"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

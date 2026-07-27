import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
};

/**
 * Cinta infinita (marquee) en CSS puro con dos copias del contenido para
 * loop perfecto. Se pausa automáticamente si el usuario prefiere menos movimiento.
 */
export function Marquee({ items, className, reverse = false }: MarqueeProps) {
  const content = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, index) => (
        <span
          key={index}
          className="font-display text-3xl md:text-5xl text-cream/90 whitespace-nowrap"
        >
          {item}
          <span className="mx-6 inline-block h-2 w-2 rounded-full bg-honey align-middle" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex motion-safe:animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {content}
        {content}
      </div>
    </div>
  );
}

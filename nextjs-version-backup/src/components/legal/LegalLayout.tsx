import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({
  title,
  updated,
  backLabel,
  children,
}: {
  title: string;
  updated: string;
  backLabel: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container max-w-3xl py-32 md:py-40">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-sans text-sm text-ink/60 hover:text-rust"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {backLabel}
      </Link>

      <h1 className="mt-8 font-display text-4xl text-ink md:text-5xl">{title}</h1>
      <p className="mt-3 font-sans text-sm text-ink/45">{updated}</p>

      <div className="mt-10 space-y-10 font-sans text-[15px] leading-relaxed text-ink/75">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

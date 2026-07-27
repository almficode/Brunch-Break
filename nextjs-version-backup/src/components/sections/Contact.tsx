"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

export function Contact() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const whatsappHref = siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp}`
    : undefined;
  const emailHref = siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : undefined;
  const phoneHref = siteConfig.contact.phone ? `tel:${siteConfig.contact.phone}` : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Envío vía cliente de correo del usuario. Para un backend real
    // (Resend, Formspree, etc.) sustituye este handler — ver README.md.
    const target = siteConfig.contact.email || "info@thebrunchbreak.com";
    const subject = encodeURIComponent(`Contacto web — ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      label: t("whatsappLabel"),
      value: siteConfig.contact.whatsapp || t("whatsappNote"),
      href: whatsappHref,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: siteConfig.contact.email || t("emailNote"),
      href: emailHref,
    },
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: siteConfig.contact.phone || t("phoneNote"),
      href: phoneHref,
    },
    {
      icon: Instagram,
      label: t("instagramLabel"),
      value: siteConfig.social.instagram.handle,
      href: siteConfig.social.instagram.url,
    },
  ];

  return (
    <section id="contact" className="bg-cream py-24 md:py-36">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6 max-w-md font-sans text-base text-ink/65"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08, 0.1)}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {contactMethods.map((method) => (
              <motion.a
                key={method.label}
                variants={fadeUp}
                href={method.href}
                target={method.href?.startsWith("http") ? "_blank" : undefined}
                rel={method.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className={cn(
                  "flex items-start gap-3 rounded-2xl border border-ink/10 p-5 transition-colors",
                  method.href ? "hover:border-rust hover:bg-rust/5" : "opacity-70"
                )}
              >
                <method.icon className="mt-0.5 h-5 w-5 shrink-0 text-rust" aria-hidden />
                <div>
                  <p className="font-sans text-xs uppercase tracking-wide text-ink/40">
                    {method.label}
                  </p>
                  <p className="mt-1 font-sans text-sm text-ink/80">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-ink/10 bg-white/40 p-8"
        >
          <div className="space-y-5">
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wide text-ink/50">
                {tForm("name")}
              </span>
              <input
                required
                type="text"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                placeholder={tForm("namePlaceholder")}
                className="mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 font-sans text-sm text-ink outline-none transition-colors focus:border-rust"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wide text-ink/50">
                {tForm("email")}
              </span>
              <input
                required
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                placeholder={tForm("emailPlaceholder")}
                className="mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 font-sans text-sm text-ink outline-none transition-colors focus:border-rust"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wide text-ink/50">
                {tForm("message")}
              </span>
              <textarea
                required
                rows={4}
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                placeholder={tForm("messagePlaceholder")}
                className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-cream px-4 py-3 font-sans text-sm text-ink outline-none transition-colors focus:border-rust"
              />
            </label>
          </div>

          <MagneticButton type="submit" variant="primary" className="mt-6 w-full justify-center">
            {tForm("submit")}
            <Send className="h-4 w-4" aria-hidden />
          </MagneticButton>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              className="mt-4 font-sans text-sm text-sage"
            >
              {tForm("success")}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

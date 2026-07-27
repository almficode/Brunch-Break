"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getStoredConsent, storeConsent } from "@/lib/cookie-consent";
import { Link } from "@/i18n/routing";
import { MagneticButton } from "./MagneticButton";

/**
 * Banner de consentimiento de cookies (CMP básico), compatible con el
 * modelo europeo "opt-in": ninguna cookie no esencial se activa hasta que
 * el usuario acepta explícitamente. Guarda la preferencia en localStorage.
 */
export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) setVisible(true);
  }, []);

  const acceptAll = () => {
    storeConsent(true);
    setVisible(false);
  };

  const rejectAll = () => {
    storeConsent(false);
    setVisible(false);
  };

  const savePreferences = () => {
    storeConsent(analytics);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-3xl border border-ink/10 bg-cream/95 p-6 shadow-2xl backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6"
        >
          <h2 className="font-display text-lg text-ink">{t("title")}</h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ink/70">
            {t("description")}
          </p>

          {showCustomize && (
            <div className="mt-4 space-y-3 rounded-2xl bg-ink/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-sm font-medium text-ink">{t("necessary")}</p>
                  <p className="font-sans text-xs text-ink/60">{t("necessaryDesc")}</p>
                </div>
                <input type="checkbox" checked disabled aria-label={t("necessary")} className="mt-1 accent-rust" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-sm font-medium text-ink">{t("analytics")}</p>
                  <p className="font-sans text-xs text-ink/60">{t("analyticsDesc")}</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  aria-label={t("analytics")}
                  className="mt-1 accent-rust"
                />
              </div>
            </div>
          )}

          <p className="mt-3 font-sans text-xs text-ink/50">
            <Link href="/legal/cookies" className="underline underline-offset-2 hover:text-rust">
              {t("policyLink")}
            </Link>
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <MagneticButton onClick={acceptAll} variant="primary" className="px-5 py-2.5 text-xs">
              {t("acceptAll")}
            </MagneticButton>
            <MagneticButton onClick={rejectAll} variant="outline" className="px-5 py-2.5 text-xs">
              {t("rejectAll")}
            </MagneticButton>
            {showCustomize ? (
              <MagneticButton onClick={savePreferences} variant="ghost" className="px-5 py-2.5 text-xs">
                {t("save")}
              </MagneticButton>
            ) : (
              <MagneticButton onClick={() => setShowCustomize(true)} variant="ghost" className="px-5 py-2.5 text-xs">
                {t("customize")}
              </MagneticButton>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

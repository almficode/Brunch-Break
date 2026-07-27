import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/content/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.cookies" });
  return buildMetadata({
    locale: locale as Locale,
    title: `${t("title")} — ${siteConfig.name}`,
    description: t("title"),
    path: "/legal/cookies",
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "legal.cookies" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const isEs = locale === "es";

  return (
    <LegalLayout title={t("title")} updated={t("updated")} backLabel={tNav("menuCta")}>
      {isEs ? (
        <>
          <LegalSection heading="1. ¿Qué son las cookies?">
            <p>
              Las cookies son pequeños archivos de texto que este sitio almacena en tu
              navegador para recordar información sobre tu visita.
            </p>
          </LegalSection>

          <LegalSection heading="2. Cookies que utilizamos">
            <p>
              <strong>Necesarias:</strong> imprescindibles para el funcionamiento del sitio
              (por ejemplo, para recordar tu elección de idioma o tu preferencia de cookies).
              No requieren consentimiento.
            </p>
            <p>
              <strong>Analíticas (opcionales):</strong> nos ayudan a entender de forma agregada
              y anónima cómo se usa el sitio. Solo se activan si das tu consentimiento explícito
              en el banner de cookies.
            </p>
          </LegalSection>

          <LegalSection heading="3. Gestión del consentimiento">
            <p>
              Al entrar por primera vez verás un banner donde puedes aceptar todas las cookies,
              rechazar las no esenciales o personalizar tu elección. Ninguna cookie analítica se
              instala antes de tu consentimiento explícito.
            </p>
            <p>
              Puedes cambiar tu decisión en cualquier momento borrando las cookies de tu
              navegador, lo que volverá a mostrar el banner en tu próxima visita.
            </p>
          </LegalSection>

          <LegalSection heading="4. Cookies de terceros">
            <p>
              Si en el futuro se integran herramientas de terceros (por ejemplo, Google
              Analytics), estas solo se cargarán tras obtener tu consentimiento analítico.
            </p>
          </LegalSection>
        </>
      ) : (
        <>
          <LegalSection heading="1. What are cookies?">
            <p>
              Cookies are small text files that this website stores in your browser to
              remember information about your visit.
            </p>
          </LegalSection>

          <LegalSection heading="2. Cookies we use">
            <p>
              <strong>Necessary:</strong> essential for the site to function (e.g. to remember
              your language choice or cookie preference). These do not require consent.
            </p>
            <p>
              <strong>Analytics (optional):</strong> help us understand, in an aggregated and
              anonymous way, how the site is used. These only activate if you give explicit
              consent in the cookie banner.
            </p>
          </LegalSection>

          <LegalSection heading="3. Managing consent">
            <p>
              On your first visit you'll see a banner where you can accept all cookies, reject
              non-essential ones, or customize your choice. No analytics cookie is installed
              before your explicit consent.
            </p>
            <p>
              You can change your decision at any time by clearing your browser cookies, which
              will show the banner again on your next visit.
            </p>
          </LegalSection>

          <LegalSection heading="4. Third-party cookies">
            <p>
              If third-party tools are integrated in the future (e.g. Google Analytics), they
              will only load after obtaining your analytics consent.
            </p>
          </LegalSection>
        </>
      )}
    </LegalLayout>
  );
}

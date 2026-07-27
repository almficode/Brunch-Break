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
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return buildMetadata({
    locale: locale as Locale,
    title: `${t("title")} — ${siteConfig.name}`,
    description: t("title"),
    path: "/legal/privacidad",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const isEs = locale === "es";

  return (
    <LegalLayout title={t("title")} updated={t("updated")} backLabel={tNav("menuCta")}>
      {isEs ? (
        <>
          <LegalSection heading="1. Responsable del tratamiento">
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de este
              sitio web es <strong>{siteConfig.legalName}</strong> (en adelante, “The Brunch
              Break”), con actividad en {siteConfig.location.city}, {siteConfig.location.region},
              {" "}
              {siteConfig.location.country}.
            </p>
            <p className="italic text-ink/50">
              PENDIENTE: completar con CIF/NIF, domicilio social exacto y datos registrales antes
              de publicar este sitio.
            </p>
          </LegalSection>

          <LegalSection heading="2. Datos que recopilamos">
            <p>
              A través del formulario de contacto podemos recabar tu nombre, correo electrónico y
              el contenido del mensaje que nos envíes. También utilizamos cookies técnicas y,
              previo consentimiento, cookies analíticas (ver nuestra Política de Cookies).
            </p>
          </LegalSection>

          <LegalSection heading="3. Finalidad del tratamiento">
            <p>
              Utilizamos tus datos exclusivamente para responder a tus consultas, gestionar
              reservas o solicitudes de catering/eventos, y para fines analíticos agregados
              cuando das tu consentimiento.
            </p>
          </LegalSection>

          <LegalSection heading="4. Base legal">
            <p>
              La base legal para el tratamiento es tu consentimiento expreso, otorgado al enviar
              el formulario de contacto o al aceptar las cookies analíticas.
            </p>
          </LegalSection>

          <LegalSection heading="5. Conservación de datos">
            <p>
              Conservamos tus datos únicamente durante el tiempo necesario para atender tu
              consulta y cumplir con las obligaciones legales aplicables.
            </p>
          </LegalSection>

          <LegalSection heading="6. Derechos de las personas usuarias">
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
              limitación y portabilidad escribiendo a{" "}
              {siteConfig.contact.email || "[email pendiente de confirmar]"}.
            </p>
          </LegalSection>

          <LegalSection heading="7. Destinatarios y transferencias">
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Los proveedores
              tecnológicos utilizados (hosting, analítica) actúan como encargados del
              tratamiento conforme al RGPD.
            </p>
          </LegalSection>
        </>
      ) : (
        <>
          <LegalSection heading="1. Data controller">
            <p>
              The data controller for the personal data collected through this website is{" "}
              <strong>{siteConfig.legalName}</strong> (“The Brunch Break”), operating in{" "}
              {siteConfig.location.city}, {siteConfig.location.region},{" "}
              {siteConfig.location.country}.
            </p>
            <p className="italic text-ink/50">
              PENDING: complete with company tax ID, registered address and registry details
              before publishing this site.
            </p>
          </LegalSection>

          <LegalSection heading="2. Data we collect">
            <p>
              Through the contact form we may collect your name, email address and message
              content. We also use technical cookies and, with your consent, analytics cookies
              (see our Cookie Policy).
            </p>
          </LegalSection>

          <LegalSection heading="3. Purpose of processing">
            <p>
              We use your data solely to respond to your inquiries, manage reservations or
              catering/event requests, and for aggregated analytics purposes when you give your
              consent.
            </p>
          </LegalSection>

          <LegalSection heading="4. Legal basis">
            <p>
              The legal basis for processing is your explicit consent, given when submitting the
              contact form or accepting analytics cookies.
            </p>
          </LegalSection>

          <LegalSection heading="5. Data retention">
            <p>
              We retain your data only for as long as necessary to handle your request and
              comply with applicable legal obligations.
            </p>
          </LegalSection>

          <LegalSection heading="6. Your rights">
            <p>
              You may exercise your rights of access, rectification, erasure, objection,
              restriction and portability by writing to{" "}
              {siteConfig.contact.email || "[email pending confirmation]"}.
            </p>
          </LegalSection>

          <LegalSection heading="7. Recipients and transfers">
            <p>
              We do not share your data with third parties except where legally required.
              Technology providers used (hosting, analytics) act as data processors under the
              GDPR.
            </p>
          </LegalSection>
        </>
      )}
    </LegalLayout>
  );
}

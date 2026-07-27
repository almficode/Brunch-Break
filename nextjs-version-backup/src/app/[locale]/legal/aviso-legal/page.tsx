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
  const t = await getTranslations({ locale, namespace: "legal.legalNotice" });
  return buildMetadata({
    locale: locale as Locale,
    title: `${t("title")} — ${siteConfig.name}`,
    description: t("title"),
    path: "/legal/aviso-legal",
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "legal.legalNotice" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const isEs = locale === "es";

  return (
    <LegalLayout title={t("title")} updated={t("updated")} backLabel={tNav("menuCta")}>
      {isEs ? (
        <>
          <LegalSection heading="1. Datos identificativos">
            <p>
              En cumplimiento del deber de información recogido en la Ley 34/2002, de Servicios
              de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa
              de que este sitio web es titularidad de <strong>{siteConfig.legalName}</strong>.
            </p>
            <p className="italic text-ink/50">
              PENDIENTE: incluir CIF/NIF, domicilio social, datos de inscripción registral y
              correo de contacto oficial antes de publicar.
            </p>
          </LegalSection>

          <LegalSection heading="2. Objeto">
            <p>
              El presente aviso legal regula el acceso y uso del sitio web {siteConfig.url},
              cuya finalidad es informar sobre los productos, servicios, carta y ubicación de
              {" "}
              {siteConfig.name}.
            </p>
          </LegalSection>

          <LegalSection heading="3. Propiedad intelectual e industrial">
            <p>
              Los contenidos de este sitio (textos, imágenes, marca y logotipo) son propiedad de
              {" "}
              {siteConfig.name} o se utilizan con la debida autorización. Queda prohibida su
              reproducción sin consentimiento expreso.
            </p>
          </LegalSection>

          <LegalSection heading="4. Condiciones de uso">
            <p>
              El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de
              acuerdo con la legislación vigente, la buena fe y el orden público.
            </p>
          </LegalSection>

          <LegalSection heading="5. Legislación aplicable">
            <p>
              Este aviso legal se rige por la legislación española. Para cualquier controversia
              serán competentes los juzgados y tribunales que correspondan conforme a derecho.
            </p>
          </LegalSection>
        </>
      ) : (
        <>
          <LegalSection heading="1. Identification details">
            <p>
              In compliance with Spanish Law 34/2002 on Information Society Services and
              Electronic Commerce (LSSI-CE), this website is owned by{" "}
              <strong>{siteConfig.legalName}</strong>.
            </p>
            <p className="italic text-ink/50">
              PENDING: include tax ID, registered address, registry details and official
              contact email before publishing.
            </p>
          </LegalSection>

          <LegalSection heading="2. Purpose">
            <p>
              This legal notice governs access to and use of the website {siteConfig.url},
              whose purpose is to inform about the products, services, menu and location of{" "}
              {siteConfig.name}.
            </p>
          </LegalSection>

          <LegalSection heading="3. Intellectual and industrial property">
            <p>
              The content of this site (text, images, brand and logo) is owned by{" "}
              {siteConfig.name} or used with due authorization. Reproduction without express
              consent is prohibited.
            </p>
          </LegalSection>

          <LegalSection heading="4. Terms of use">
            <p>
              Users agree to make appropriate and lawful use of the website, in accordance with
              applicable law, good faith and public order.
            </p>
          </LegalSection>

          <LegalSection heading="5. Governing law">
            <p>
              This legal notice is governed by Spanish law. Any dispute will be subject to the
              competent courts as determined by law.
            </p>
          </LegalSection>
        </>
      )}
    </LegalLayout>
  );
}

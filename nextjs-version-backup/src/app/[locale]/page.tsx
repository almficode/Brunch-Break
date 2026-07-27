import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Philosophy } from "@/components/sections/Philosophy";
import { Specialties } from "@/components/sections/Specialties";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Gallery } from "@/components/sections/Gallery";
import { MenuSection } from "@/components/sections/MenuSection";
import { Reviews } from "@/components/sections/Reviews";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { Location } from "@/components/sections/Location";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <Story />
      <Philosophy />
      <Specialties />
      <FeaturedProducts />
      <Gallery />
      <MenuSection />
      <Reviews />
      <InstagramSection />
      <Location />
      <Contact />
    </>
  );
}

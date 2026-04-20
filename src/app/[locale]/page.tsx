import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SeoIntro } from "@/components/SeoIntro";
import { Benefits } from "@/components/Benefits";
import { Services } from "@/components/Services";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getReviewsForLocale } from "@/lib/reviews";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("Nav");
  const reviewsData = await getReviewsForLocale(locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ring focus:shadow-lg focus:outline-none"
      >
        {tNav("skipToContent")}
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <SeoIntro />
        <Services />
        <Benefits />
        <Faq />
        <ReviewsSection data={reviewsData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import React, { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/landing/hero/HeroSection";
import TrustedBy from "@/components/landing/TrustedBy";
import Marquee from "@/components/landing/Marquee";
import OmnichannelFlow from "@/components/landing/features/OmnichannelFlow";
import FeatureInbox from "@/components/landing/features/FeatureInbox";
import FeatureAgents from "@/components/landing/features/FeatureAgents";
import FeatureCRM from "@/components/landing/features/FeatureCRM";
import FeatureAnalytics from "@/components/landing/features/FeatureAnalytics";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/landing/ChatWidget";
import Header from "@/components/landing/Header";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Landing" });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
    openGraph: {
      title: t("Metadata.title"),
      description: t("Metadata.description"),
      type: "website",
      url: "https://replyxbase.com",
      images: [
        {
          url: "/assets/dashboard_hero.png",
          width: 1200,
          height: 630,
          alt: t("Metadata.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("Metadata.title"),
      description: t("Metadata.description"),
      images: ["/assets/dashboard_hero.png"],
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Landing" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Replyxbase",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t("Metadata.description"),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-gray-900 selection:bg-blue-100 selection:text-[#2A4D9A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main>
        <HeroSection session={null} /> 
        <TrustedBy />
        <OmnichannelFlow />
        <div id="features">
          <FeatureInbox />
          <FeatureAgents />
          <FeatureCRM />
          <FeatureAnalytics />
        </div>
        
        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <TestimonialsSection />
        </Suspense>
        
        <PricingSection />
        
        <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
          <CTASection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
        <Footer />
      </Suspense>
      
      <ChatWidget />
    </div>
  );
}

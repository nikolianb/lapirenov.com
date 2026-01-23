import React from 'react';
import { Helmet } from 'react-helmet';
import HeroImage from '@/components/HeroImage';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTABanner from '@/components/CTABanner';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Lapirenov - Expert en Rénovation de Façades et Murs</title>
        <meta name="description" content="Expert en rénovation de façades, traitement de fissures, isolation extérieure et enduit à la chaux. Lapirenov transforme et protège votre habitat." />
      </Helmet>

      <main className="overflow-x-hidden">
        {/* 1. Hero Section (Enhanced) */}
        <HeroImage />

        {/* 2. Services Section (Enhanced) */}
        <ServicesSection />

        {/* 3. CTA Banner */}
        <CTABanner />

        {/* 4. Stats Section */}
        <StatsSection />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 6. Testimonials Section */}
        <TestimonialsSection />

        {/* 7. FAQ Section */}
        <FAQSection />

        {/* 8. CTA Banner (Secondary) */}
        <CTABanner secondary={true} />
      </main>
    </>
  );
}

export default HomePage;
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroImage from '@/components/HeroImage';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTABanner from '@/components/CTABanner';

function HomePage() {
  const seoSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Lapi Renov',
    legalName: 'LAPI RENOV',
    url: 'https://lapirenov.com/',
    telephone: '+33 7 62 73 51 61',
    email: 'info@lapirenov.fr',
    vatID: 'FR55995099702',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '262 chemin des Fleches',
      postalCode: '01000',
      addressLocality: 'Saint-Denis-les-Bourg',
      addressCountry: 'FR',
    },
    areaServed: ['Saint-Denis-les-Bourg', 'Bourg-en-Bresse', 'Ain'],
    openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-13:00'],
  };
  return (
    <>
      <Helmet>
        <title>Lapi Renov | Renovation de facades a Saint-Denis-les-Bourg</title>
        <meta
          name="description"
          content="Lapi Renov, expert en renovation de facades, traitement des fissures, isolation exterieure et enduits. Interventions a Saint-Denis-les-Bourg (Ain) et alentours."
        />
        <meta property="og:title" content="Lapi Renov | Renovation de facades a Saint-Denis-les-Bourg" />
        <meta
          property="og:description"
          content="Lapi Renov, expert en renovation de facades, traitement des fissures, isolation exterieure et enduits. Interventions a Saint-Denis-les-Bourg (Ain) et alentours."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lapi Renov" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:url" content="https://lapirenov.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Lapi Renov | Renovation de facades a Saint-Denis-les-Bourg" />
        <meta
          name="twitter:description"
          content="Lapi Renov, expert en renovation de facades, traitement des fissures, isolation exterieure et enduits. Interventions a Saint-Denis-les-Bourg (Ain) et alentours."
        />
        <script type="application/ld+json">{JSON.stringify(seoSchema)}</script>
      </Helmet>

      <main className="overflow-x-hidden">
        {/* 1. Hero Section (Enhanced) */}
        <HeroImage />

        {/* 2. Services Section (Enhanced) */}
        <ServicesSection />

        {/* 3. CTA Banner */}
        <CTABanner />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 5. Testimonials Section */}
        <TestimonialsSection />

        {/* 6. FAQ Section */}
        <FAQSection />

        {/* 7. CTA Banner (Secondary) */}
        <CTABanner secondary={true} />
      </main>
    </>
  );
}

export default HomePage;

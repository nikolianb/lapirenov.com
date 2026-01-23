import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import BookingSystem from '@/components/BookingSystem';
import Breadcrumb from '@/components/Breadcrumb';

function BookingPage() {
  return (
    <>
      <Helmet>
        <title>Reservation consultation | Lapi Renov</title>
        <meta
          name="description"
          content="Reservez une consultation gratuite avec Lapi Renov pour votre projet de renovation a Saint-Denis-les-Bourg (Ain)."
        />
        <meta property="og:title" content="Reservation consultation | Lapi Renov" />
        <meta
          property="og:description"
          content="Reservez une consultation gratuite avec Lapi Renov pour votre projet de renovation a Saint-Denis-les-Bourg (Ain)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lapi Renov" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:url" content="https://lapirenov.com/booking" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Reservation consultation | Lapi Renov" />
        <meta
          name="twitter:description"
          content="Reservez une consultation gratuite avec Lapi Renov pour votre projet de renovation a Saint-Denis-les-Bourg (Ain)."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-[#1e3a8a] via-blue-800 to-[#0f172a] pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-6 py-2 bg-[#d4af37]/20 backdrop-blur-sm border border-[#d4af37]/30 text-[#d4af37] font-semibold rounded-full mb-6">
                Consultation Gratuite
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Réserver une Consultation
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discutons de votre projet ensemble. Les experts Lapirenov sont là pour vous conseiller et vous accompagner.
              </p>
            </motion.div>
          </div>
        </section>

        <Breadcrumb pageName="Réserver" />

        {/* Booking Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BookingSystem />
        </section>
      </div>
    </>
  );
}

export default BookingPage;

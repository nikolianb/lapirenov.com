import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTABanner = ({ secondary = false }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className={`absolute inset-0 ${secondary ? 'bg-[#1e3a8a]' : 'bg-gradient-to-r from-[#1e3a8a] to-[#0f172a]'} z-0`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-[80px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/10 rounded-full backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Prêt à Transformer <span className="text-[#d4af37]">Votre Espace?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet de rénovation et obtenir un devis personnalisé.
          </p>
          
          <Button
            onClick={() => navigate('/booking')}
            className="group bg-gradient-to-r from-[#d4af37] to-amber-600 hover:from-amber-500 hover:to-amber-500 text-white font-bold px-10 py-8 text-xl rounded-xl shadow-2xl hover:shadow-[#d4af37]/50 transform hover:scale-105 transition-all duration-300"
          >
            Réserver une Consultation
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

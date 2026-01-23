import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroImage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1524190952534-79b1f7d6ad5c?q=80&w=1600&auto=format&fit=crop"
          alt="Rénovation de Luxe"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/90 via-[#1e3a8a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 bg-[#d4af37]/20 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] font-bold rounded-full mb-6 text-sm tracking-widest uppercase shadow-lg">
            Rénovation de Luxe Professionnelle
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-lg"
        >
          Transformez 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-amber-200 to-[#d4af37]">
            Votre Espace
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl leading-relaxed drop-shadow-md"
        >
          Expertise, raffinement et qualité supérieure pour vos projets de rénovation les plus ambitieux.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center"
        >
          <Button
            onClick={() => navigate('/portfolio')}
            className="group bg-gradient-to-r from-[#d4af37] to-amber-600 hover:from-amber-500 hover:to-amber-500 text-white font-bold px-8 py-7 text-lg rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Voir Nos Projets
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Button
            onClick={() => navigate('/booking')}
            className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 hover:border-white/50 font-semibold px-8 py-7 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Réserver
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroImage;

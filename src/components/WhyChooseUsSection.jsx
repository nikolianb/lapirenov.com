import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Clock, ThumbsUp, PenTool } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: "Fiabilité Absolue",
    description: "Nous respectons nos engagements et garantissons la sécurité de votre chantier.",
    gradient: "from-blue-500 to-blue-700"
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Utilisation exclusive de matériaux haut de gamme et finitions irréprochables.",
    gradient: "from-amber-400 to-amber-600"
  },
  {
    icon: Users,
    title: "Équipe Experte",
    description: "Des artisans qualifiés et passionnés avec plus de 10 ans d'expérience moyenne.",
    gradient: "from-emerald-500 to-emerald-700"
  },
  {
    icon: Clock,
    title: "Délais Respectés",
    description: "Une planification rigoureuse pour livrer votre projet en temps et en heure.",
    gradient: "from-purple-500 to-purple-700"
  },
  {
    icon: ThumbsUp,
    title: "Garantie Décennale",
    description: "Tous nos travaux sont couverts par une assurance décennale pour votre tranquillité.",
    gradient: "from-rose-500 to-rose-700"
  },
  {
    icon: PenTool,
    title: "Devis Transparent",
    description: "Aucune surprise, nos devis sont détaillés, clairs et sans frais cachés.",
    gradient: "from-cyan-500 to-cyan-700"
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d4af37] font-semibold tracking-wider uppercase text-sm">Pourquoi Nous Choisir</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">L'Excellence Lapirenov</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group hover:translate-y-[-5px]"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#d4af37] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Ravalement de façades",
    image: "https://images.unsplash.com/photo-1698945090987-155f06e1f508?auto=format&fit=crop&w=900&q=80",
    description: "Redonnez vie et éclat à vos murs extérieurs avec nos techniques de nettoyage et de rénovation professionnelles."
  },
  {
    id: 2,
    title: "Traitements des fissures",
    image: "https://images.unsplash.com/photo-1658760015062-6489ecccde00?auto=format&fit=crop&w=900&q=80",
    description: "Solutions durables pour réparer et prévenir les fissures structurelles et esthétiques de vos bâtiments."
  },
  {
    id: 3,
    title: "Isolation extérieure",
    image: "https://images.unsplash.com/photo-1659350705994-66be3ec1a7cb?auto=format&fit=crop&w=900&q=80",
    description: "Améliorez le confort thermique et réduisez vos factures d'énergie grâce à une isolation performante par l'extérieur."
  },
  {
    id: 4,
    title: "Enduit/Peinture Interieure",
    image: "https://images.pexels.com/photos/30754633/pexels-photo-30754633.jpeg?cs=srgb&dl=pexels-arturoaez225-30754633.jpg&fm=jpg",
    description: "Finitions interieures soignees avec enduits lisses et peintures durables pour des murs parfaitement homogenes."
  },
  {
    id: 5,
    title: "Peintures / Façades",
    image: "https://images.unsplash.com/photo-1541335053535-43fc70968e0a?auto=format&fit=crop&w=900&q=80",
    description: "Large gamme de peintures extérieures résistantes aux intempéries pour sublimer votre patrimoine."
  },
  {
    id: 6,
    title: "Joints de pierre",
    image: "https://images.unsplash.com/photo-1678794792985-4813c5ac036d?auto=format&fit=crop&w=900&q=80",
    description: "Restauration minutieuse des joints de pierre pour préserver l'authenticité et la solidité de vos murs anciens."
  }
];

function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-[#1e3a8a] font-semibold rounded-full mb-4 text-sm tracking-wide uppercase">
              Nos Expertises
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-6">
              Nos Services de Rénovation
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lapirenov met à votre disposition son savoir-faire pour valoriser et protéger votre patrimoine immobilier avec des standards de qualité élevés.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/90 via-[#1e3a8a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 relative flex-grow flex flex-col justify-between">
                <div className="absolute top-0 right-6 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#d4af37] to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-[-45deg] transition-all duration-300 z-10">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600 leading-relaxed pt-2 mb-4">
                  {service.description}
                </p>
                
                <div className="pt-4 mt-auto border-t border-gray-100">
                  <span className="text-[#1e3a8a] font-medium text-sm group-hover:text-[#d4af37] transition-colors flex items-center">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

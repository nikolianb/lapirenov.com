import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Propriétaire, Paris 16ème",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "Une transformation incroyable de notre appartement. L'équipe a su écouter nos besoins et proposer des solutions élégantes. Le respect des délais est un vrai plus !",
    rating: 5
  },
  {
    id: 2,
    name: "Jean-Philippe Dubois",
    role: "Architecte d'Intérieur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content: "Je collabore régulièrement avec Lapirenov pour mes clients. Leur souci du détail et la qualité des finitions sont incomparables sur le marché.",
    rating: 5
  },
  {
    id: 3,
    name: "Marie & Thomas L.",
    role: "Rénovation Maison de Campagne",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "Un grand merci à toute l'équipe pour leur professionnalisme. Le ravalement de façade a redonné tout son cachet à notre maison familiale.",
    rating: 5
  }
];

const StarRating = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-300'}`} 
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#1e3a8a] font-semibold tracking-wider uppercase text-sm bg-blue-100 px-4 py-1 rounded-full">Témoignages</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-[#1e3a8a]">Ce que disent nos clients</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            La satisfaction de nos clients est notre plus belle réussite. Découvrez leurs retours d'expérience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative border border-gray-100"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100/50" />
              
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37] p-0.5"
                />
                <div>
                  <h4 className="font-bold text-[#1e3a8a]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <div className="mt-1">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

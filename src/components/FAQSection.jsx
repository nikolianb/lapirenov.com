import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, DollarSign, Shield, Hammer } from 'lucide-react';

const faqs = [
  {
    question: "Combien de temps dure une rénovation ?",
    answer: "La durée dépend de l'ampleur du projet. Une rénovation de cuisine prend généralement 3 à 5 semaines, tandis qu'une rénovation complète d'appartement peut durer 2 à 3 mois. Nous fournissons un planning détaillé avant chaque démarrage.",
    icon: Clock
  },
  {
    question: "Quels sont vos tarifs ?",
    answer: "Chaque projet est unique. Nous proposons un devis détaillé et gratuit après une première visite technique. Nos prix sont transparents et incluent la main d'œuvre qualifiée et les matériaux de haute qualité.",
    icon: DollarSign
  },
  {
    question: "Offrez-vous une garantie ?",
    answer: "Absolument. Tous nos travaux de gros œuvre et de structure sont couverts par une garantie décennale (10 ans). Les autres travaux bénéficient d'une garantie biennale.",
    icon: Shield
  },
  {
    question: "Comment se déroule le processus ?",
    answer: "1. Premier contact et visite technique. 2. Devis détaillé et planning. 3. Validation et choix des matériaux. 4. Démarrage des travaux avec suivi hebdomadaire. 5. Réception du chantier et validation finale.",
    icon: Hammer
  },
  {
    question: "Utilisez-vous des matériaux écologiques ?",
    answer: "Oui, nous privilégions des matériaux durables et respectueux de l'environnement (peintures biosourcées, isolation naturelle, bois certifié) lorsque cela est techniquement possible et souhaité par le client.",
    icon: HelpCircle
  },
  {
    question: "Comment puis-je vous contacter ?",
    answer: "Vous pouvez nous joindre par téléphone, via le formulaire de contact sur ce site, ou directement via WhatsApp. Nous nous engageons à répondre sous 24 heures ouvrées.",
    icon: HelpCircle
  }
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  const Icon = faq.icon;
  
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={toggle}
        className="w-full px-6 py-5 text-left flex items-center justify-between bg-white focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-[#1e3a8a] text-white' : 'bg-blue-50 text-[#1e3a8a]'} transition-colors duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 ml-[3.5rem] text-gray-600 leading-relaxed border-l-2 border-blue-100 pl-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d4af37] font-semibold tracking-wider uppercase text-sm">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-[#1e3a8a]">Questions Fréquentes</h2>
          <p className="text-gray-600">
            Retrouvez les réponses aux questions les plus courantes sur nos services de rénovation.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FAQItem 
                faq={faq} 
                isOpen={openIndex === index} 
                toggle={() => setOpenIndex(openIndex === index ? -1 : index)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
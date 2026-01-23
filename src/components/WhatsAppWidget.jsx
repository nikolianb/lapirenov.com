import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

function WhatsAppWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "33762735161"; // Using placeholder format
  const message = encodeURIComponent("Bonjour, je souhaite obtenir plus d'informations sur vos services de rénovation.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="mb-4 mr-2 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 text-gray-800 text-sm font-medium whitespace-nowrap"
          >
            Contactez-nous sur WhatsApp
            <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg hover:shadow-green-500/30 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="w-8 h-8 text-white fill-current" />
        <span className="sr-only">Contactez-nous sur WhatsApp</span>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
      </motion.a>
    </div>
  );
}

export default WhatsAppWidget;

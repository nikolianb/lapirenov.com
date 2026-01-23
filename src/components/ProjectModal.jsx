import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function ProjectModal({ project, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!project) return null;

  const handleBookConsultation = () => {
    onClose();
    navigate('/booking', { state: { projectType: project.category, projectTitle: project.title } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-50 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(100vh-2rem)] md:max-h-[85vh]">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 960px, 100vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-1.5 bg-amber-600 text-white text-sm font-semibold rounded-full mb-3">
                    {project.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Description du Projet</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="font-semibold text-blue-900">Durée</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{project.timeline}</p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-amber-900">Budget</span>
                    </div>
                    <p className="text-xl font-bold text-amber-900">{project.budget}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-green-900">Matériaux</span>
                    </div>
                    <p className="text-lg font-bold text-green-900">{project.materials.length} types</p>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Matériaux Utilisés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-amber-600 rounded-full" />
                        <span className="text-gray-700 font-medium">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleBookConsultation}
                    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Réserver une Consultation pour ce Projet
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;

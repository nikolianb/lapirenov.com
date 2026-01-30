import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/projectData';
import ProjectModal from '@/components/ProjectModal';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import before1 from '@/images/before1.jpg';
import after1 from '@/images/after1.jpg';
import before2 from '@/images/before2.jpg';
import after2 from '@/images/after2.jpg';

const progressImages = Object.entries(
  import.meta.glob('/src/images/progress/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
)
  .map(([path, src]) => {
    const filename = path.split('/').pop() || '';
    const order = Number.parseInt(filename, 10) || 0;
    return { src, filename, order };
  })
  .sort((a, b) => a.order - b.order);

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);

  const categories = ['All', 'Kitchen', 'Bathroom', 'Living Room', 'Other'];

  const categoryLabels = {
    'All': 'Tous',
    'Kitchen': 'Cuisine',
    'Bathroom': 'Salle de Bain',
    'Living Room': 'Salon',
    'Other': 'Extérieur & Autres'
  };

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProgress = () => setSelectedProgress(null);

  const openProgressAt = (index) => {
    if (progressImages.length === 0) return;
    const total = progressImages.length;
    const nextIndex = ((index % total) + total) % total;
    const nextImage = progressImages[nextIndex];
    setSelectedProgress({ ...nextImage, index: nextIndex });
  };

  useEffect(() => {
    if (!selectedProgress) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProgress(null);
      }
      if (event.key === 'ArrowRight') {
        openProgressAt(selectedProgress.index + 1);
      }
      if (event.key === 'ArrowLeft') {
        openProgressAt(selectedProgress.index - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProgress]);

  return (
    <>
      <Helmet>
        <title>Portfolio | Lapi Renov - Renovation de facades</title>
        <meta
          name="description"
          content="Decouvrez les realisations Lapi Renov : facades, traitements de murs, enduits et isolation a Saint-Denis-les-Bourg (Ain)."
        />
        <meta property="og:title" content="Portfolio | Lapi Renov - Renovation de facades" />
        <meta
          property="og:description"
          content="Decouvrez les realisations Lapi Renov : facades, traitements de murs, enduits et isolation a Saint-Denis-les-Bourg (Ain)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lapi Renov" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:url" content="https://lapirenov.com/portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Portfolio | Lapi Renov - Renovation de facades" />
        <meta
          name="twitter:description"
          content="Decouvrez les realisations Lapi Renov : facades, traitements de murs, enduits et isolation a Saint-Denis-les-Bourg (Ain)."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-[#1e3a8a] via-blue-900 to-[#0f172a] pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
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
                Nos Réalisations
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nos réalisations
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Explorez notre galerie de rénovations et inspirez-vous pour votre futur projet.
              </p>
            </motion.div>
          </div>
        </section>
        
        <Breadcrumb pageName="Portfolio" />

        {/* Before / After Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                Avant / Après
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
                La transformation en un coup d'œil
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Faites glisser le curseur pour comparer le résultat avant et après rénovation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterSlider
              title="Projet 1"
              beforeImage={before1}
              afterImage={after1}
            />
            <BeforeAfterSlider
              title="Projet 2"
              beforeImage={before2}
              afterImage={after2}
            />
          </div>
        </section>

        {/* Progress Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                Suivi du chantier
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
                L'evolution du projet pas a pas
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Visualisez chaque etape du chantier, du debut jusqu'aux finitions.
              </p>
            </div>
          </div>

          {progressImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {progressImages.map((image, index) => (
                <button
                  type="button"
                  key={image.filename}
                  onClick={() => openProgressAt(index)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow text-left"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image.src}
                      alt={`Etape ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-[#1e3a8a] text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Etape {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Filter and Search Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Rechercher un projet..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent shadow-sm transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? 'bg-[#1e3a8a] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 text-gray-500 text-sm font-medium">
            Affichage de {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''}
          </div>

          {/* Projects Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-[#1e3a8a] text-xs font-bold rounded-full uppercase tracking-wide shadow-sm">
                      {categoryLabels[project.category]}
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        onClick={() => handleViewDetails(project)}
                        className="w-full bg-[#d4af37] hover:bg-amber-600 text-white font-semibold"
                      >
                        Voir les détails
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-sm font-semibold text-gray-400">Durée: <span className="text-[#1e3a8a]">{project.timeline}</span></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtre.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-4 text-[#1e3a8a] font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </section>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Progress Gallery Modal */}
      <AnimatePresence>
        {selectedProgress && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70"
              onClick={handleCloseProgress}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseProgress}
            >
              <div
                className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => openProgressAt(selectedProgress.index - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  aria-label="Image precedente"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => openProgressAt(selectedProgress.index + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseProgress}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  aria-label="Fermer la galerie"
                >
                  <span className="text-xl leading-none text-gray-700">×</span>
                </button>
                <div className="relative">
                  <img
                    src={selectedProgress.src}
                    alt={`Etape ${selectedProgress.index + 1}`}
                    className="w-full max-h-[80vh] object-contain bg-black"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 text-[#1e3a8a] text-sm font-semibold px-4 py-2 rounded-full shadow">
                    Etape {selectedProgress.index + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Portfolio;

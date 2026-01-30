import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Calendar, Menu, X, MessageCircle, Mail } from 'lucide-react';
import logo from '@/images/logo/lapi_renov_traced.svg';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setIsScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/portfolio', label: 'Nos réalisations', icon: Briefcase },
    { to: '/booking', label: 'Réserver', icon: Calendar }
  ];

  const whatsappUrl = "https://wa.me/33762735161";
  const emailAddress = "info@lapirenov.fr";

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ${
                isScrolled ? 'bg-gradient-to-br from-[#1e3a8a] to-blue-700 shadow-md' : ''
              }`}
            >
              <img
                src={logo}
                alt="Lapi Renov"
                className="w-14 h-14 object-contain"
              />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 tracking-tight ${
              isScrolled ? 'text-[#1e3a8a]' : 'text-white'
            }`}>
              Lapi Renov
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                    isActive(link.to)
                      ? 'bg-[#1e3a8a] text-white shadow-md'
                      : isScrolled
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-[#1e3a8a]'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {/* WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ml-2 ${
                 isScrolled
                  ? 'text-[#25D366] hover:bg-green-50'
                  : 'text-[#25D366] bg-white/10 hover:bg-white/20'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className={isScrolled ? 'text-gray-700' : 'text-white'}>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-[#1e3a8a] hover:bg-blue-50' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 bg-white/95 backdrop-blur-lg rounded-b-lg border-t border-gray-100 shadow-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 transition-colors duration-300 ${
                    isActive(link.to)
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <a
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="font-medium">Contact WhatsApp</span>
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-300"
            >
              <Mail className="w-5 h-5 text-[#1e3a8a]" />
              <span className="font-medium">{emailAddress}</span>
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navigation;

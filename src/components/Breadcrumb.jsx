import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumb = ({ pageName, parentPage }) => {
  return (
    <motion.nav 
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50/50 backdrop-blur-sm border-b border-gray-100"
    >
      <ol className="max-w-7xl mx-auto flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-[#1e3a8a] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>
        {parentPage && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link 
                to={parentPage.path}
                className="hover:text-[#1e3a8a] transition-colors font-medium"
              >
                {parentPage.name}
              </Link>
            </li>
          </>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <li>
          <span className="text-[#1e3a8a] font-semibold" aria-current="page">
            {pageName}
          </span>
        </li>
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;
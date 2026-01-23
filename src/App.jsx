import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import Portfolio from '@/pages/Portfolio';
import BookingPage from '@/pages/BookingPage';
import BookingConfirmationPage from '@/pages/BookingConfirmationPage';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Toaster } from '@/components/ui/toaster';

// Create a wrapper component to use useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          } 
        />
        <Route 
          path="/booking" 
          element={
            <PageTransition>
              <BookingPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/booking-confirmation" 
          element={
            <PageTransition>
              <BookingConfirmationPage />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex-grow"
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-gray-900 antialiased selection:bg-blue-100 selection:text-[#1e3a8a]">
        <Navigation />
        
        <AnimatedRoutes />

        <Footer />
        <WhatsAppWidget />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MithraBot from './MithraBot';
import FloatingShapes from './FloatingShapes';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Add smooth scrolling behavior
  useEffect(() => {
    if (isMounted) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isMounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 text-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-900/90 dark:to-gray-800/90 -z-10" />
      
      {/* Floating shapes */}
      <FloatingShapes />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content with page transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="relative z-10 min-h-[calc(100vh-5rem)] pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Mithra Bot */}
      <MithraBot />
      
      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} WellNest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

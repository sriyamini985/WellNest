import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import PeerSupport from './pages/PeerSupport';
import Research from './pages/Research';
import About from './pages/About';
import Contact from './pages/Contact';
import MindConnect from './pages/MindConnect';
import AdminDashboard from './pages/AdminDashboard';

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            } 
          />
          <Route 
            path="/about" 
            element={
              <PageTransition>
                <About />
              </PageTransition>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <PageTransition>
                <Resources />
              </PageTransition>
            } 
          />
          <Route 
            path="/peer-support" 
            element={
              <PageTransition>
                <PeerSupport />
              </PageTransition>
            } 
          />
          <Route 
            path="/research" 
            element={
              <PageTransition>
                <Research />
              </PageTransition>
            } 
          />
          <Route 
            path="/mind-connect" 
            element={
              <PageTransition>
                <MindConnect />
              </PageTransition>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            } 
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;

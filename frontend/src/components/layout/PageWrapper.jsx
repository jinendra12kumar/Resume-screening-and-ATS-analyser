import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  const isDashboardLayout = user && !isAuthPage && !isLandingPage;

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {isDashboardLayout && <Sidebar />}
        
        <main className={`flex-1 w-full p-6 md:p-8 ${isDashboardLayout ? 'overflow-y-auto max-h-[calc(100vh-4rem)]' : ''}`}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;

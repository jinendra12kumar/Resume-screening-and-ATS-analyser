import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Terminal, Award, FileSpreadsheet, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout, changeRole } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) return null;

  const getLinkClass = (path) => {
    const base = "text-sm font-semibold tracking-wide transition-all relative py-1 select-none font-display";
    const isActive = location.pathname === path;
    return `${base} ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg text-slate-800 tracking-tight">
            Screen<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          {user && (
            <>
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
              <Link to="/upload" className={getLinkClass('/upload')}>Scan & Match</Link>
              <Link to="/builder" className={getLinkClass('/builder')}>Builder</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={getLinkClass('/admin')}>Admin Panel</Link>
              )}
            </>
          )}
        </nav>

        {/* Action Controls / Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Role Toggle Switch (FOR DEMO PREVIEW) */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-semibold font-display shadow-inner">
                <button
                  onClick={() => changeRole('candidate')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'candidate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => changeRole('recruiter')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'recruiter' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Recruiter
                </button>
                <button
                  onClick={() => changeRole('admin')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${user.role === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Admin
                </button>
              </div>

              {/* User Dropdown / Sign out */}
              <div className="flex items-center gap-2 border-l border-slate-100 pl-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div className="hidden lg:block text-left select-none">
                  <p className="text-xs font-bold text-slate-700 leading-tight">{user.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-none">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition-colors ml-1"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Hamburger Menu Icon (Mobile Only) */}
          {user && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-3.5 shadow-lg select-none"
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getLinkClass('/')}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getLinkClass('/dashboard')}
                >
                  Dashboard
                </Link>
                <Link
                  to="/upload"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getLinkClass('/upload')}
                >
                  Scan & Match
                </Link>
                <Link
                  to="/builder"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getLinkClass('/builder')}
                >
                  Builder
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={getLinkClass('/admin')}
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

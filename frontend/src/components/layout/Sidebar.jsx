import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  Search,
  Sliders,
  Settings,
  Users,
  PieChart,
  Shield,
  Activity,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  if (!user) return null;

  const getSidebarLinks = () => {
    const common = [
      { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { path: '/upload', label: 'Scan & Match', icon: UploadCloud },
      { path: '/builder', label: 'Resume Builder', icon: FileText },
    ];

    const admin = [
      { path: '/admin', label: 'System Analytics', icon: PieChart },
      { path: '/admin-users', label: 'Manage Users', icon: Users, mock: true },
      { path: '/admin-security', label: 'Security & Keys', icon: Shield, mock: true },
    ];

    if (user.role === 'admin') {
      return [...common, ...admin];
    }

    return common;
  };

  const links = getSidebarLinks();

  return (
    <aside className={`border-r border-slate-100 bg-white h-[calc(100vh-4rem)] sticky top-16 hidden md:flex flex-col justify-between py-6 shrink-0 relative transition-all duration-300 ${
      isCollapsed ? 'w-16 px-2' : 'w-52 px-4'
    }`}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={toggleCollapse}
        className="absolute -right-3.5 top-5 w-7 h-7 rounded-full border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all z-50 cursor-pointer hover:scale-105 active:scale-95"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="space-y-6">
        {/* Workspace Label */}
        <div className={`px-3 transition-all duration-300 ${isCollapsed ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none select-none ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse shrink-0" />
            {!isCollapsed && <span>Workspace Context</span>}
          </div>
          {!isCollapsed && (
            <p className="text-xs font-extrabold text-slate-700 font-display mt-1.5 select-none truncate">
              {user.role === 'admin' ? '🔑 Admin Panel' : user.role === 'recruiter' ? '💼 Recruiter Suite' : '🚀 Candidate'}
            </p>
          )}
        </div>

        {/* Links list */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.mock ? '#' : link.path}
                title={isCollapsed ? link.label : undefined}
                className={`
                  flex items-center rounded-xl text-sm font-semibold transition-all relative font-display select-none
                  ${isCollapsed 
                    ? 'justify-center w-10 h-10 mx-auto px-0 py-0' 
                    : 'gap-3 px-3.5 py-2.5'}
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 font-bold' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
                  ${link.mock ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {!isCollapsed && <span>{link.label}</span>}
                
                {isActive && !isCollapsed && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      {!isCollapsed && (
        <div className="border-t border-slate-100 pt-4 px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider space-y-1 select-none">
          <div className="flex justify-between">
            <span>API:</span>
            <span className="text-emerald-500 font-bold">Online</span>
          </div>
          <div className="flex justify-between">
            <span>AI:</span>
            <span className="text-emerald-500 font-bold">Active</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

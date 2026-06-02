import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    // Initial load: Check if tokens exist and decode/mock a session
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // For mock purposes or backend sync
      const mockUser = {
        id: 'user-123',
        email: 'candidate@company.com',
        name: 'Alex Mercer',
        role: localStorage.getItem('user_role') || 'candidate', // candidate, recruiter, admin
      };
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Attempt API call to backend
      const res = await api.post('/auth/login', { email, password });
      const { access_token, refresh_token } = res.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      // Extract role (we default to candidate, if email has "recruiter" we set recruiter)
      const role = email.includes('recruiter') ? 'recruiter' : email.includes('admin') ? 'admin' : 'candidate';
      localStorage.setItem('user_role', role);

      const loggedUser = {
        id: 'user-real',
        email,
        name: email.split('@')[0].toUpperCase(),
        role,
      };

      setUser(loggedUser);
      showToast('Logged in successfully!', 'success');
      return { success: true };
    } catch (err) {
      console.warn('Backend unavailable, falling back to mock login');
      // Mock fallback: Allow logging in with any details
      const role = email.includes('recruiter') ? 'recruiter' : email.includes('admin') ? 'admin' : 'candidate';
      const mockUser = {
        id: 'user-mock',
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role,
      };
      
      localStorage.setItem('access_token', 'mock-access-token');
      localStorage.setItem('refresh_token', 'mock-refresh-token');
      localStorage.setItem('user_role', role);
      
      setUser(mockUser);
      showToast('Welcome (Demo Mode)! Login simulated.', 'success');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'candidate') => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password, role });
      showToast('Registration successful! Please login.', 'success');
      return { success: true };
    } catch (err) {
      console.warn('Backend unavailable, simulating mock register');
      showToast('Registration successful (Demo Mode)!', 'success');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    setUser(null);
    showToast('Logged out successfully.', 'info');
  };

  const changeRole = (newRole) => {
    localStorage.setItem('user_role', newRole);
    if (user) {
      setUser({ ...user, role: newRole });
      showToast(`Switched workspace context to: ${newRole.toUpperCase()}`, 'info');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, changeRole }}>
      {children}
    </AuthContext.Provider>
  );
};

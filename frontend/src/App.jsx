import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PageWrapper from './components/layout/PageWrapper';

// Pages
import Landing from './pages/Landing';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/auth/AuthPages';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Matching from './pages/Matching';
import Builder from './pages/Builder';
import Admin from './pages/Admin';

// Route Protector for authenticated endpoints
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role authorization is specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppContent = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route
        path="/"
        element={
          <PageWrapper>
            <Landing />
          </PageWrapper>
        }
      />

      {/* Authentication Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Private Workspace Area */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <PageWrapper>
              <Upload />
            </PageWrapper>
          </PrivateRoute>
        }
      />

      <Route
        path="/analysis"
        element={
          <PrivateRoute>
            <PageWrapper>
              <Analysis />
            </PageWrapper>
          </PrivateRoute>
        }
      />

      <Route
        path="/matching"
        element={
          <PrivateRoute>
            <Navigate to="/upload" replace />
          </PrivateRoute>
        }
      />

      <Route
        path="/builder"
        element={
          <PrivateRoute>
            <PageWrapper>
              <Builder />
            </PageWrapper>
          </PrivateRoute>
        }
      />

      {/* Admin Panel */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <PageWrapper>
              <Admin />
            </PageWrapper>
          </PrivateRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Mail, Lock, User, Sparkles, Award, KeyRound, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Simple checks
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email address is required';
    if (!password) validationErrors.password = 'Password is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Enter your credentials to access your Screening panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <span />
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors font-display"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider font-display">
          New to ScreenAI?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 transition-colors font-bold">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    let validationErrors = {};
    if (!name) validationErrors.name = 'Full name is required';
    if (!email) validationErrors.email = 'Email address is required';
    if (!password || password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await register(name, email, password, role);
    setLoading(false);
    
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
            Get started
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Create an account and screening resumes in minutes
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Full Name"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            icon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          <Select
            label="I am joining as a"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { label: 'Candidate (Optimizing my resume)', value: 'candidate' },
              { label: 'Recruiter (Screener resumes database)', value: 'recruiter' },
              { label: 'Administrator (SaaS Platform Owner)', value: 'admin' },
            ]}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider font-display">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Password recovery instructions sent to your email.', 'success');
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-6 w-full max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-display"
        >
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>

        {!submitted ? (
          <>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
                Reset password
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Enter your email address and we'll send you recovery links
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-2"
                loading={loading}
              >
                Send Instructions
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-5 text-center p-6 border border-emerald-100 rounded-3xl bg-emerald-50/10">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight font-display">
              Check your email
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              We have sent security guidelines to **{email}**. Please follow the provided instructions to restore access.
            </p>
            <Link to="/login" className="block pt-2">
              <Button variant="secondary" className="w-full">
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

// Base layout sharing beautiful marketing visual (split-screen canvas)
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 w-full bg-slate-50/20 select-none">
      
      {/* Marketing Side Panel (Left) */}
      <div className="hidden lg:flex lg:col-span-5 bg-white border-r border-slate-100 p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Subtle background gradient grids */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50/40 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50/20 rounded-full filter blur-3xl -z-10" />

        {/* Header Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Award className="w-4.5 h-4.5" />
          </div>
          <span className="font-display font-bold text-base text-slate-800 tracking-tight">
            Screen<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Main Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full font-display"
          >
            <Sparkles className="w-3.5 h-3.5" /> Enterprise Screening
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight font-display">
            The intelligent candidate pipeline.
          </h1>
          
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Gain full tracking capability. Instantly assess job alignments, score keyword overlaps, extract certifications, and match talent at scale.
          </p>

          {/* Bullet proofs */}
          <div className="space-y-3 pt-2">
            {[
              '99.8% Parser accuracy on multi-columns',
              'Integrated matching radargram statistics',
              'GDPR-compliant security pipelines'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-600 font-display">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">
          &copy; 2026 SCREENAI INC. ALL RIGHTS RESERVED.
        </span>

      </div>

      {/* Form Canvas (Right) */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-4 sm:p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md bg-white border border-slate-100 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          {children}
        </motion.div>
      </div>

    </div>
  );
};

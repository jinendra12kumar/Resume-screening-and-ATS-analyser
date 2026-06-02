import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Upload,
  Brain,
  Zap,
  TrendingUp,
  Search,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  FileText,
  Eye,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import confetti from 'canvas-confetti';

const Landing = () => {
  const [demoScore, setDemoScore] = useState(65);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleScoreSlider = (e) => {
    const val = parseInt(e.target.value, 10);
    setDemoScore(val);
    if (val >= 90) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#60a5fa'],
      });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-100 bg-emerald-50/30';
    if (score >= 65) return 'text-blue-500 border-blue-100 bg-blue-50/30';
    return 'text-amber-500 border-amber-100 bg-amber-50/30';
  };

  const faqData = [
    {
      q: "How does the AI analyze my resume?",
      a: "Our advanced NLP engine parses the layout structure and semantic content of your resume. It maps skills, certifications, and project bullet points against thousands of industry-standard job descriptions, extracting hidden keywords and formatting inconsistencies instantly."
    },
    {
      q: "What is an ATS score?",
      a: "An Applicant Tracking System (ATS) score measures how effectively your resume is structured for digital scanning filters. Scoring over 80% ensures your profile bypasses standard gatekeeping filters and reaches hiring managers."
    },
    {
      q: "Is my personal information secure?",
      a: "Absolutely. All uploaded files are encrypted during processing. We do not sell or store candidate data for third-party use, and you can permanently delete your resumes and analytics history at any time with a single click."
    },
    {
      q: "Can I compare multiple resumes against a single job?",
      a: "Yes! Using our premium Job Description Matcher, you can compare multiple revisions of your resumes simultaneously to select the absolute best fit for the role before submitting."
    }
  ];

  return (
    <div className="w-full space-y-24 md:space-y-36 pb-16">
      
      {/* Background Floaters */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-100/20 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="text-center pt-8 md:pt-16 max-w-4xl mx-auto space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-bold font-display select-none tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI ATS Screener</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight md:leading-none font-display"
        >
          Score Your Resume.<br />
          Land the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Interview.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
        >
          Stop guessing why recruiters aren't calling back. ScreenAI instantly scans your resume against digital Applicant Tracking Systems (ATS) to identify missing keywords, semantic skills, and critical formatting issues.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/upload">
            <Button variant="primary" size="lg" icon={<Upload className="w-5 h-5" />}>
              Analyze Your Resume
            </Button>
          </Link>
          <Link to="/builder">
            <Button variant="outline" size="lg" icon={<FileText className="w-5 h-5" />}>
              Build From Template
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Interactive Demo Card Simulator */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-12 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full filter blur-xl" />
            
            <div className="space-y-6">
              <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight font-display">
                Simulate Your Score
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Adjust the sliding scale below to see how optimizing your profile against critical search parameters impacts your final ranking. Reach **90%+** to celebrate!
              </p>
              
              {/* Simulator Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
                  <span>Formatting & Keywords Profile</span>
                  <span className="text-blue-600">{demoScore}% Optimized</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={demoScore}
                  onChange={handleScoreSlider}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 border border-slate-50 rounded-xl bg-slate-50/30 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">
                    Keywords Found
                  </p>
                  <p className="text-sm font-extrabold text-slate-700 mt-0.5">
                    {demoScore > 80 ? '24/25 Matched' : demoScore > 60 ? '16/25 Matched' : '8/25 Matched'}
                  </p>
                </div>
                <div className="p-3 border border-slate-50 rounded-xl bg-slate-50/30 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">
                    Action Plan
                  </p>
                  <p className="text-sm font-extrabold text-blue-600 mt-0.5 flex items-center gap-1 cursor-pointer">
                    View Tips <ArrowRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </div>
            </div>

            {/* Score Visual Representation */}
            <div className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-3xl bg-slate-50/30 shadow-inner relative min-h-[300px]">
              <div className="relative flex items-center justify-center">
                
                {/* SVG Radial Score */}
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke={demoScore >= 85 ? '#10b981' : demoScore >= 65 ? '#3b82f6' : '#f59e0b'}
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 84}
                    strokeDashoffset={2 * Math.PI * 84 * (1 - demoScore / 100)}
                    transition={{ type: 'spring', stiffness: 60 }}
                  />
                </svg>
                
                {/* Score Number Centered */}
                <div className="absolute text-center select-none">
                  <span className="text-5xl font-extrabold text-slate-800 font-display">
                    {demoScore}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold block mt-1 uppercase tracking-wider font-display">
                    ATS Rank
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`mt-6 px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wider font-display ${getScoreColor(demoScore)}`}>
                {demoScore >= 85 ? '🎉 Ready to apply' : demoScore >= 65 ? '⚡ good (Needs updates)' : '⚠️ poor compatibility'}
              </div>
            </div>

          </Card>
        </motion.div>
      </section>

      {/* Trusted-By Section */}
      <section className="max-w-7xl mx-auto px-6 text-center space-y-8 select-none">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none font-display">
          TRUSTED BY LEADERS IN TALENT & RECRUITING
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-45 grayscale contrast-125">
          <span className="text-lg font-extrabold tracking-tight text-slate-800 font-display">Stripe</span>
          <span className="text-xl font-bold tracking-tight text-slate-800 font-display">Notion</span>
          <span className="text-lg font-black tracking-wider text-slate-800 font-display">LINEAR</span>
          <span className="text-lg font-extrabold tracking-wide text-slate-800 font-display">Vercel</span>
          <span className="text-lg font-extrabold tracking-wider text-slate-800 font-display">Framer</span>
        </div>
      </section>

      {/* Core Features Showcase */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight font-display">
            Built for modern professional recruiting
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Gain immediate insight into candidate databases, optimize resume structure, and bypass structural screening barriers in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-premium-hover hover:border-blue-100 transition-all p-8 flex flex-col items-start gap-5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
              Real-Time Screening
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Upload PDF or DOCX formats and receive a comprehensive scoring audit covering keywords, grammar, and alignment within 5 seconds.
            </p>
          </Card>

          <Card className="hover:shadow-premium-hover hover:border-blue-100 transition-all p-8 flex flex-col items-start gap-5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
              Keyword Optimization
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Identify key technological skills, project concepts, and certifications that are missing from your resume and paste templates directly.
            </p>
          </Card>

          <Card className="hover:shadow-premium-hover hover:border-blue-100 transition-all p-8 flex flex-col items-start gap-5">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
              JD Semantic Matcher
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Copy-paste job postings directly and match your CV dynamically to calculate exact overlap rankings using sentence-embeddings.
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight font-display">
            Loved by candidates globally
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card padding="lg" className="border-slate-100 shadow-md flex flex-col justify-between min-h-[220px]">
            <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
              "Using ScreenAI completely changed my job hunting workflow. I immediately identified that my previous resume was completely unreadable by ATS scanners. After scoring 92% and rewriting my skills section, I received three calls from top-tier firms within a single week!"
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white font-display">
                MS
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-700 leading-tight">Marcus Sterling</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  Senior React Engineer, Stripe
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="border-slate-100 shadow-md flex flex-col justify-between min-h-[220px]">
            <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
              "The Job Description Matcher is literally black magic. I could immediately paste target postings and see how my qualifications stacked up. It takes the guesswork out of tailoring applications. Absolutely a premium experience!"
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white font-display">
                EL
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-700 leading-tight">Evelyn Laurent</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  Technical Product Lead, Notion
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-12">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight text-center font-display">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <Card
                key={index}
                padding="none"
                onClick={() => setActiveFaq(isOpen ? null : index)}
                className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm transition-all"
              >
                <div className="flex items-center justify-between p-6 select-none cursor-pointer hover:bg-slate-50/50">
                  <h4 className="text-base font-bold text-slate-700 font-display text-left">
                    {faq.q}
                  </h4>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-500 font-medium leading-relaxed text-left border-t border-slate-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-slate-100/90 pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Award className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-bold text-base text-slate-800 tracking-tight">
                Screen<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Screening candidates and optimizing profiles with best-in-class AI intelligence layers.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
              Platform
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              <li><Link to="/upload" className="hover:text-blue-600">ATS Screener</Link></li>
              <li><Link to="/matching" className="hover:text-blue-600">JD Matching</Link></li>
              <li><Link to="/builder" className="hover:text-blue-600">CV Builder</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
              Security
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              <li className="hover:text-blue-600 cursor-pointer">GDPR Compliance</li>
              <li className="hover:text-blue-600 cursor-pointer">Data Encryption</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy Shield</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
              Company
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              <li className="hover:text-blue-600 cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-blue-600 cursor-pointer">Support Desk</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider font-display">
          <span>&copy; 2026 ScreenAI Inc. All Rights Reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;

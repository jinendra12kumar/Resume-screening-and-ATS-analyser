import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Terminal,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Textarea } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';

const Analysis = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id') || 'res-uploaded';
  const { showToast } = useToast();

  const [bulletInput, setBulletInput] = useState('');
  const [bulletOutput, setBulletOutput] = useState('');
  const [rewriting, setRewriting] = useState(false);

  // Mock Analysis reports
  const report = {
    score: 82,
    fileName: resumeId === 'res-uploaded' ? 'New_Scanned_CV.pdf' : 'Alex_Mercer_CV.pdf',
    targetRole: 'Senior React Developer',
    matchedSkills: ['React.js', 'Redux Toolkit', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'Git', 'Webpack'],
    missingSkills: ['TypeScript', 'GraphQL', 'AWS (S3/EC2)', 'Docker', 'CI/CD Pipelines'],
    suggestions: [
      { id: 1, title: 'Improve Action Verbs', text: "Change 'helped with design' to 'Spearheaded frontend architectural layout' in your lead job experience.", type: 'warning' },
      { id: 2, title: 'Increase Keyword Metrics', text: "Quantify your impact! E.g. 'reduced asset size by 40%' instead of general 'optimized site performance'.", type: 'warning' },
      { id: 3, title: 'Check Margin Structure', text: "Excellent! Header margins align correctly. Readability index is top-tier.", type: 'success' },
    ],
  };

  const handleRewriteBullet = (e) => {
    e.preventDefault();
    if (!bulletInput.trim()) return;

    setRewriting(true);
    setBulletOutput('');

    setTimeout(() => {
      setRewriting(false);
      setBulletOutput(
        "Spearheaded responsive frontend component architecture using React.js and Tailwind CSS, increasing page interaction performance indices by 34% and streamlining asset build modularity."
      );
      showToast('AI bullet rewrite completed!', 'success');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 select-none">
        <div className="space-y-1.5 text-left">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-display mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display flex items-center gap-2.5">
            AI Screening Audit <span className="text-blue-600 text-sm font-bold bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{report.fileName}</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <Link to="/matching">
            <Button variant="outline" icon={<TrendingUp className="w-4.5 h-4.5" />}>
              Match to Job Description
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Radial score and matched lists */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Radial score card */}
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 bg-white border border-slate-100 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full filter blur-xl" />
            
            <div className="text-left space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider rounded-full font-display">
                <CheckCircle className="w-3.5 h-3.5" /> Optimal Structure
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display leading-tight">
                Excellent Compatibility
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Your profile matches **{report.targetRole}** core search tags exceptionally well. Addressing the missing skills will elevate your profile to top candidate queues.
              </p>
            </div>

            {/* Circular score chart */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="relative flex items-center justify-center select-none">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="64" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 64}
                    initial={{ strokeDashoffset: 2 * Math.PI * 64 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 64 * (1 - report.score / 100) }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-slate-800 font-display">{report.score}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5 font-display">ATS Rank</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Matrix Lists */}
          <Card className="space-y-6 bg-white border border-slate-100 shadow-premium p-6 md:p-8">
            <div className="text-left select-none">
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
                Hard skills Matrix overlap
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Extracted competencies compared against market indices
              </p>
            </div>

            {/* Matched skills */}
            <div className="space-y-3 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">
                Matched Keywords ({report.matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2.5">
                {report.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl border border-emerald-100 bg-emerald-50/30 text-emerald-700 text-xs font-bold font-display shadow-sm"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing skills */}
            <div className="space-y-3 text-left pt-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">
                Missing Keywords ({report.missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-2.5">
                {report.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl border border-rose-100 bg-rose-50/30 text-rose-700 text-xs font-bold font-display shadow-sm hover:bg-rose-50 transition-colors cursor-help"
                    title={`Click to copy recommendations for adding ${skill}`}
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>

          </Card>

          {/* AI Bullet point rewriter simulation */}
          <Card className="space-y-6 bg-white border border-slate-100 shadow-premium p-6 md:p-8">
            <div className="text-left select-none flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
                  AI CV Bullet Rewriter
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Draft raw statements and watch AI restructure them for maximum ATS points
                </p>
              </div>
            </div>

            <form onSubmit={handleRewriteBullet} className="space-y-4 text-left">
              <Textarea
                label="Raw experience statement"
                id="bullet"
                placeholder="E.g. I worked on styling the website and helped with React speed optimizations."
                value={bulletInput}
                onChange={(e) => setBulletInput(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                loading={rewriting}
                disabled={!bulletInput.trim()}
                icon={<Sparkles className="w-4.5 h-4.5" />}
              >
                Rewrite Statement
              </Button>
            </form>

            <AnimatePresence>
              {bulletOutput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/15 text-left relative overflow-hidden"
                >
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-display mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Optimized Output (Ready to paste)
                  </p>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    {bulletOutput}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(bulletOutput);
                      showToast('Copied optimized bullet!', 'success');
                    }}
                    className="mt-3.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider font-display"
                  >
                    Copy to Clipboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

        </div>

        {/* Right column: Specific warnings & Layout audit */}
        <div className="space-y-8">
          
          {/* Action Checklist */}
          <Card className="space-y-6 bg-white border border-slate-100 shadow-premium p-6 md:p-8">
            <div className="text-left select-none">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
                Formatting & Text audit
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Structural parsing feedback
              </p>
            </div>

            <div className="space-y-5 text-left">
              {report.suggestions.map((sug) => (
                <div key={sug.id} className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {sug.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 font-display leading-none">
                      {sug.title}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                      {sug.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick links template helper */}
          <Card className="bg-slate-50 border border-slate-100/80 p-6 rounded-3xl text-left space-y-4 select-none">
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> Template center
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Don't struggle manually formatting structures. Build your CV directly in our live editable editor using standard ATS-approved models.
            </p>
            <Link to="/builder" className="inline-block">
              <Button variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Go to Resume Builder
              </Button>
            </Link>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Analysis;

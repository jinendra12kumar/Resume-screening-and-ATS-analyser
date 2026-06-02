import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import {
  Sparkles,
  FileText,
  CheckCircle2,
  ChevronRight,
  Activity,
  Search,
  Briefcase,
  Clock,
  FileCheck,
  AlertCircle,
  Award,
  TrendingUp,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import UploadZone from '../components/ui/UploadZone';
import { Textarea, Input } from '../components/ui/Input';

const Upload = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'match'
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Uploader State
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseStage, setParseStage] = useState('');

  // Matcher State
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [matching, setMatching] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
  const [matchResult, setMatchResult] = useState(null);

  // File Select Handler
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Start Parsing (Uploader)
  const handleStartParsing = () => {
    if (!selectedFile) return;

    setParsing(true);
    setParseProgress(0);
    setParseStage('Uploading Document...');
  };

  // Simulating multi-stage parsing for visual premium impact
  useEffect(() => {
    let interval;
    if (parsing) {
      interval = setInterval(() => {
        setParseProgress((prev) => {
          const next = prev + 5;
          
          if (next === 25) setParseStage('Reading Document Layout...');
          if (next === 50) setParseStage('Extracting Skills & Experience...');
          if (next === 75) setParseStage('Running AI ATS Score Alignment...');
          if (next === 95) setParseStage('Finalizing Audit Matrix...');

          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setParsing(false);
              showToast('Resume parsed and analyzed successfully!', 'success');
              navigate('/analysis?id=res-uploaded');
            }, 500);
            return 100;
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [parsing, navigate, showToast]);

  // Start Matching (Job Matcher)
  const handleStartMatching = (e) => {
    e.preventDefault();
    if (!jobDesc.trim()) return;

    setMatching(true);
    setMatchProgress(0);
    setMatchResult(null);

    const interval = setInterval(() => {
      setMatchProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setMatching(false);
            setMatchResult({
              score: 76,
              semanticMatch: 'High Contextual Alignment',
              description: 'The candidate profile shows outstanding alignment with technical core engineering, but lacks listed metrics regarding cloud infrastructure (AWS/Docker).',
              requirements: [
                { skill: 'React.js & State Management', required: true, matched: true },
                { skill: 'Tailwind CSS / Responsive Design', required: true, matched: true },
                { skill: 'TypeScript Integration', required: true, matched: false },
                { skill: 'GraphQL APIs', required: false, matched: false },
                { skill: 'Cloud Services (AWS)', required: false, matched: false },
                { skill: 'Unit and Integration Testing', required: true, matched: true },
              ],
              recommendations: [
                "Insert 1-2 bullet points in your Lead Developer experience showing 'TypeScript' code structure updates.",
                "Quantify web-performance updates (e.g. state 'Improved page load speed by 25%' using clean rendering).",
                "Explicitly list 'AWS' certifications or project involvements under secondary skills.",
              ],
            });
            showToast('JD comparison analysis finished!', 'success');
          }, 300);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className={`mx-auto space-y-8 pb-16 transition-all duration-300 ${activeTab === 'match' ? 'max-w-6xl' : 'max-w-4xl'}`}>
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6 select-none">
        <div className="text-left space-y-1.5">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-display mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display flex items-center gap-2">
            Workspace Scanner
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Perform an AI Audit on your resume formatting, layout, keywords, and match alignments.
          </p>
        </div>

        {/* Tab Switcher Segmented Controller */}
        <div className="flex bg-slate-100 p-1 rounded-2xl max-w-md shadow-inner select-none font-display">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'upload' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Resume Scanner
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'match' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Search className="w-4 h-4" />
            Job Description Matcher
          </button>
        </div>
      </div>

      {/* Tabs Container */}
      <AnimatePresence mode="wait">
        {activeTab === 'upload' ? (
          <motion.div
            key="upload-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left main: Drag/Drop Upload Area */}
            <Card className="lg:col-span-2 space-y-6 bg-white border border-slate-100 shadow-premium p-6 md:p-8">
              <div className="text-left select-none">
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
                  Upload CV Document
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Drag file below or browse directories
                </p>
              </div>

              <UploadZone
                onFileSelect={handleFileSelect}
                loading={parsing}
                progress={parseProgress}
              />

              <AnimatePresence>
                {selectedFile && !parsing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <Button
                      onClick={handleStartParsing}
                      variant="primary"
                      className="w-full"
                      size="lg"
                      icon={<Sparkles className="w-5 h-5 animate-pulse" />}
                    >
                      Start AI Screening Audit
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Descriptive parsing stage text */}
              <AnimatePresence>
                {parsing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 p-3.5 border border-slate-50 rounded-xl bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-widest font-display shadow-inner"
                  >
                    <Activity className="w-4 h-4 text-blue-500 animate-spin" />
                    <span>{parseStage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Right side panel: Instructions & Pipeline checklist */}
            <Card className="space-y-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between">
              <div className="space-y-6 text-left select-none">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
                      Screening Checklist
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Supported segments
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Skills Extract', desc: 'Auto extraction of hard and soft competencies.' },
                    { title: 'Semantic Overlap', desc: 'Identifies contextual experience matching.' },
                    { title: 'Format & Layout Checker', desc: 'Finds standard column margin bugs.' },
                    { title: 'AI Redactor (recruiter)', desc: 'Auto hides names, address for unbiased screening.' }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 font-display">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-400 pl-5 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-blue-50 bg-blue-50/10 rounded-2xl text-left font-display">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Recruiter Tip
                </p>
                <p className="text-[11px] text-slate-500 font-medium leading-normal">
                  Toggle to Recruiter workspace context on the header navbar to simulate blind candidate data sheets.
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="match-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Side: paste job desc area */}
            <div className="lg:col-span-7 space-y-8">
              <Card className="bg-white border border-slate-100 shadow-premium p-6 md:p-8 space-y-6">
                <div className="text-left select-none flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
                      Compare Position details
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Paste the JD and details of your target role
                    </p>
                  </div>
                </div>

                <form onSubmit={handleStartMatching} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      id="title"
                      placeholder="E.g. Senior Frontend Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <Input
                      label="Company Name"
                      id="company"
                      placeholder="E.g. Stripe Inc."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <Textarea
                    label="Job Description Text"
                    id="jd"
                    placeholder="Paste the core responsibilities, skills, and qualifications listed on the job posting..."
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    rows={10}
                    required
                  />

                  {!matching ? (
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full mt-2"
                      disabled={!jobDesc.trim()}
                      icon={<Search className="w-4.5 h-4.5" />}
                    >
                      Analyze Alignment Overlap
                    </Button>
                  ) : (
                    <div className="w-full space-y-3 pt-2 text-center">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest font-display">
                        <span>Comparing attributes...</span>
                        <span>{matchProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-blue-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${matchProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </Card>
            </div>

            {/* Right Side: dynamic match percentage reports */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {!matchResult ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <Card className="h-full bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-8 text-center select-none min-h-[350px]">
                      <div className="p-4 bg-white text-slate-400 rounded-3xl mb-4 border border-slate-100 shadow-premium">
                        <FileCheck className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-slate-700 tracking-tight font-display mb-1">
                        Waiting for analysis
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs leading-normal">
                        Enter target position guidelines on the left, then trigger comparison scans.
                      </p>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Score badge card */}
                    <Card className="bg-white border border-slate-100 shadow-premium p-6 md:p-8 space-y-5 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-full filter blur-xl" />
                      
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center select-none shrink-0">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#10b981"
                              strokeWidth="6"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={2 * Math.PI * 40 * (1 - matchResult.score / 100)}
                            />
                          </svg>
                          <span className="absolute text-xl font-extrabold text-slate-800 font-display">
                            {matchResult.score}%
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
                            Job Match index
                          </h4>
                          <h3 className="text-base font-extrabold text-slate-800 tracking-tight mt-0.5 font-display">
                            {matchResult.semanticMatch}
                          </h3>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1 leading-none">
                            ✓ Strong Technical Overlap
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                        {matchResult.description}
                      </p>
                    </Card>

                    {/* Overlap checklists */}
                    <Card className="bg-white border border-slate-100 shadow-premium p-6 md:p-8 space-y-5 text-left">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display leading-none">
                        Required Tags Overlap
                      </h4>

                      <div className="space-y-3.5">
                        {matchResult.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 text-xs font-bold text-slate-700">
                            <span className="truncate max-w-[200px] font-display">{req.skill}</span>
                            <div className="flex items-center gap-2 font-display">
                              {req.matched ? (
                                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px]">
                                  Matched
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-[10px]">
                                  Missing
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Recommended actions list */}
                    <Card className="bg-white border border-slate-100 shadow-premium p-6 md:p-8 space-y-5 text-left">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display leading-none flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" /> AI Improvement Plan
                      </h4>

                      <div className="space-y-4">
                        {matchResult.recommendations.map((tip, idx) => (
                          <div key={idx} className="flex gap-2.5 text-xs font-semibold text-slate-600 leading-relaxed">
                            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold font-display mt-0.5">
                              {idx + 1}
                            </div>
                            <p>{tip}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Upload;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Filter,
  Sparkles,
  Users,
  Search,
  Upload,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState('all');

  // Unified mock data for analytics
  const performanceTrend = [
    { name: 'Rev 1', score: 58 },
    { name: 'Rev 2', score: 68 },
    { name: 'Rev 3', score: 75 },
    { name: 'Rev 4', score: 82 },
    { name: 'Rev 5', score: 89 },
  ];

  const recruiterScanVolume = [
    { name: 'Mon', scans: 12 },
    { name: 'Tue', scans: 19 },
    { name: 'Wed', scans: 32 },
    { name: 'Thu', scans: 25 },
    { name: 'Fri', scans: 45 },
  ];

  const recentResumes = [
    {
      id: 'res-1',
      name: 'Alex_Mercer_CV.pdf',
      score: 89,
      status: 'analyzed',
      date: '2026-05-18',
      role: 'Senior React Developer',
    },
    {
      id: 'res-2',
      name: 'Jane_Smith_Design.docx',
      score: 72,
      status: 'analyzed',
      date: '2026-05-16',
      role: 'Lead UX Designer',
    },
    {
      id: 'res-3',
      name: 'Dave_DataScience.pdf',
      score: 55,
      status: 'updates_needed',
      date: '2026-05-12',
      role: 'Data Scientist',
    },
  ];

  const aiInsights = [
    { text: "Your 'React Native' keyword overlap is outstanding, placing you in the top 5% of candidates.", type: 'success' },
    { text: "Consider adding 'System Design' concepts to your Lead UX resume to improve ATS overlap score.", type: 'warning' },
    { text: "Adjust the left padding of the education section layout; parser found a column alignment mismatch.", type: 'info' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="space-y-1.5 text-left">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
            Welcome, {user?.name || 'Guest'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {user?.role === 'admin' 
              ? 'Control panel: Monitoring system pipelines and user usage metrics.' 
              : user?.role === 'recruiter' 
              ? 'Recruiting space: Track applicant score indices and match positions.' 
              : 'Candidate space: Refining and auditing resume layout compatibility.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/upload">
            <Button variant="primary" icon={<Upload className="w-4.5 h-4.5" />}>
              Scan New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid 1: Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {user?.role === 'candidate' ? (
          <>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Revisions Scanned</p><p className="text-xl font-extrabold text-slate-700">5 Versions</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Award className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Highest ATS Rank</p><p className="text-xl font-extrabold text-slate-700">89% Optimized</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Zap className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Skills Extracted</p><p className="text-xl font-extrabold text-slate-700">32 Competencies</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Optimization Plan</p><p className="text-xl font-extrabold text-slate-700">3 Steps Remaining</p></div>
            </Card>
          </>
        ) : (
          <>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Total Applicants</p><p className="text-xl font-extrabold text-slate-700">1,482 Scans</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Average Match Score</p><p className="text-xl font-extrabold text-slate-700">76.4% Rating</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Zap className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">AI Latency Rate</p><p className="text-xl font-extrabold text-slate-700">1.2 seconds</p></div>
            </Card>
            <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5.5 h-5.5" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Pending Reviews</p><p className="text-xl font-extrabold text-slate-700">14 resumes</p></div>
            </Card>
          </>
        )}
      </div>

      {/* Grid 2: Charts and AI recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recharts Analytics Panel */}
        <Card padding="md" className="lg:col-span-2 space-y-6 bg-white border border-slate-100 shadow-premium">
          <div className="flex items-center justify-between select-none">
            <div className="text-left">
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
                {user?.role === 'candidate' ? 'Optimization Score Timeline' : 'Screener Queue Activity'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {user?.role === 'candidate' ? 'Tracking score improvements across file uploads' : 'Daily resume processing rates'}
              </p>
            </div>
            <Button variant="ghost" size="sm" icon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {user?.role === 'candidate' ? (
                <AreaChart data={performanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" />
                </AreaChart>
              ) : (
                <BarChart data={recruiterScanVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="scans" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Recommendations panel */}
        <Card padding="md" className="space-y-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between">
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-2 select-none">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
                  AI Real-Time Insights
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Personalized suggestions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed font-semibold text-slate-600">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                    insight.type === 'success' ? 'bg-emerald-500' : insight.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <p>{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Link to="/upload" className="w-full">
            <Button variant="secondary" size="md" className="w-full" icon={<ArrowUpRight className="w-4 h-4" />}>
              Open Analysis Center
            </Button>
          </Link>
        </Card>

      </div>

      {/* Grid 3: Recent Resumes Scanner Queue Table */}
      <Card padding="md" className="space-y-6 bg-white border border-slate-100 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div className="text-left">
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
              Recent Scans history
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              List of recent CV revisions processed on this workspace
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-display transition-all ${filterType === 'all' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              All Files
            </button>
            <button
              onClick={() => setFilterType('excellent')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-display transition-all ${filterType === 'excellent' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              High Rank (80%+)
            </button>
          </div>
        </div>

        {/* Custom Table styling */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                <th className="py-4 px-4">Filename</th>
                <th className="py-4 px-4">Target Role</th>
                <th className="py-4 px-4">Upload Date</th>
                <th className="py-4 px-4">ATS Rank</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentResumes
                .filter((res) => filterType === 'all' || (filterType === 'excellent' && res.score >= 80))
                .map((resume) => (
                  <tr key={resume.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm font-semibold text-slate-600">
                    <td className="py-4.5 px-4 text-slate-800 font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{resume.name}</span>
                    </td>
                    <td className="py-4.5 px-4">{resume.role}</td>
                    <td className="py-4.5 px-4 text-slate-400 text-xs">{resume.date}</td>
                    <td className="py-4.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${resume.score >= 80 ? 'bg-emerald-500' : resume.score >= 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                            style={{ width: `${resume.score}%` }}
                          />
                        </div>
                        <span className={`font-bold ${resume.score >= 80 ? 'text-emerald-600' : resume.score >= 60 ? 'text-blue-600' : 'text-amber-600'}`}>
                          {resume.score}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4.5 px-4 text-right">
                      <Link to={`/analysis?id=${resume.id}`}>
                        <Button variant="outline" size="sm" icon={<Search className="w-3.5 h-3.5" />}>
                          Analyze
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;

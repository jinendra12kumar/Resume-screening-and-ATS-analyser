import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  Shield,
  Users,
  Award,
  Zap,
  Activity,
  UserCheck,
  Ban,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  Server,
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
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const tokenUsage = [
    { name: '08:00', tokens: 1200 },
    { name: '10:00', tokens: 4200 },
    { name: '12:00', tokens: 7800 },
    { name: '14:00', tokens: 5400 },
    { name: '16:00', tokens: 8900 },
    { name: '18:00', tokens: 3200 },
  ];

  const systemUsers = [
    { id: 'usr-1', name: 'Alex Mercer', email: 'alex.mercer@gmail.com', date: '2026-05-18', scans: 5, active: true },
    { id: 'usr-2', name: 'Jane Smith', email: 'jane.smith@design.com', date: '2026-05-16', scans: 2, active: true },
    { id: 'usr-3', name: 'Dave Miller', email: 'dave.miller@data.com', date: '2026-05-12', scans: 9, active: false },
    { id: 'usr-4', name: 'Emma Watson', email: 'emma@actress.org', date: '2026-05-10', scans: 1, active: true },
  ];

  const handleToggleUser = (userId, status) => {
    // Simulated state change feedback
    showToast(`User status updated to: ${status ? 'ACTIVE' : 'SUSPENDED'}`, 'info');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 select-none">
        <div className="space-y-1.5 text-left">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider font-display mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-display flex items-center gap-2">
            🔑 Administrator Control Panel
          </h1>
        </div>
      </div>

      {/* Stats Grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Server className="w-5.5 h-5.5" /></div>
          <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">System Health</p><p className="text-xl font-extrabold text-emerald-500">99.9% Online</p></div>
        </Card>
        <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Users className="w-5.5 h-5.5" /></div>
          <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Active Database</p><p className="text-xl font-extrabold text-slate-700">4,812 Users</p></div>
        </Card>
        <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Activity className="w-5.5 h-5.5" /></div>
          <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">AI Scans Run</p><p className="text-xl font-extrabold text-slate-700">12,842 files</p></div>
        </Card>
        <Card padding="sm" className="bg-white border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5.5 h-5.5" /></div>
          <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">API Latency</p><p className="text-xl font-extrabold text-slate-700">1.25s average</p></div>
        </Card>
      </div>

      {/* Recharts API token tracking graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <Card padding="md" className="lg:col-span-2 space-y-6 bg-white border border-slate-100 shadow-premium">
          <div className="text-left select-none">
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
              AI Token Credit usage
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Live consumption rates of standard OpenAI/Anthropic pipelines
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tokenColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#tokenColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Server metrics logs */}
        <Card padding="md" className="space-y-6 bg-white border border-slate-100 shadow-premium">
          <div className="text-left select-none">
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
              Server Event stream
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              System logging status
            </p>
          </div>

          <div className="space-y-3.5 font-mono text-[11px] leading-relaxed text-slate-500 text-left bg-slate-50 p-4 border border-slate-100 rounded-2xl max-h-64 overflow-y-auto">
            <p className="text-slate-400 select-none">**[16:08:12] -- SYSTEM STARTUP INIT**</p>
            <p className="text-slate-400 select-none">[16:08:14] DB Migration files processed successfully.</p>
            <p className="text-slate-400 select-none">[16:08:15] Backend FastAPI lifespan yield hook reached.</p>
            <p className="text-slate-400 select-none">[16:08:15] Routers initialized: Auth, User, Jobs, Resumes.</p>
            <p className="text-slate-400 select-none">--</p>
            <p className="text-emerald-600 font-semibold">[21:38:11] API Server healthy. Listening port 8000.</p>
            <p className="text-blue-600 font-semibold">[21:39:25] React+Vite asset bundle mapping established.</p>
          </div>
        </Card>

      </div>

      {/* Users table */}
      <Card padding="md" className="space-y-6 bg-white border border-slate-100 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div className="text-left">
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight font-display">
              Manage Registered Users
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Control client activation sheets
            </p>
          </div>

          <div className="max-w-xs w-full">
            <Input
              id="search"
              placeholder="Search user directories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* User sheets */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Registration Date</th>
                <th className="py-4 px-4">CV Scans run</th>
                <th className="py-4 px-4">Client Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {systemUsers
                .filter((usr) => usr.name.toLowerCase().includes(searchTerm.toLowerCase()) || usr.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((usr) => (
                  <tr key={usr.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm font-semibold text-slate-600">
                    <td className="py-4.5 px-4 text-left">
                      <p className="text-slate-800 font-bold leading-tight">{usr.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{usr.email}</p>
                    </td>
                    <td className="py-4.5 px-4 text-slate-400 text-xs">{usr.date}</td>
                    <td className="py-4.5 px-4 font-bold text-slate-700">{usr.scans} files</td>
                    <td className="py-4.5 px-4">
                      {usr.active ? (
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px]">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-[10px]">
                          Suspended
                        </span>
                      )}
                    </td>
                    <td className="py-4.5 px-4 text-right">
                      {usr.active ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50/20"
                          icon={<Ban className="w-3.5 h-3.5" />}
                          onClick={() => handleToggleUser(usr.id, false)}
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/20"
                          icon={<UserCheck className="w-3.5 h-3.5" />}
                          onClick={() => handleToggleUser(usr.id, true)}
                        >
                          Reactivate
                        </Button>
                      )}
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

export default Admin;

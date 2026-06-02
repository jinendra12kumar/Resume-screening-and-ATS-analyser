import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  FileText,
  Printer,
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  ArrowLeft,
  ChevronDown,
  User,
  Briefcase,
  BookOpen,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Link } from 'react-router-dom';

const Builder = () => {
  const { showToast } = useToast();
  const [template, setTemplate] = useState('modern');
  const [activeSection, setActiveSection] = useState('header');
  const [mobileView, setMobileView] = useState('edit'); // 'edit' or 'preview'

  // Input states
  const [cvData, setCvData] = useState({
    name: 'Alex Mercer',
    title: 'Senior React Developer',
    email: 'alex.mercer@gmail.com',
    phone: '+1 (555) 019-2834',
    address: 'San Francisco, CA',
    summary: 'Detail-oriented and high-performing Frontend Engineer with 5+ years of experience structuring modular architectures in React.js, Tailwind CSS, and TypeScript systems.',
    education: [
      { school: 'University of California, Berkeley', degree: 'B.S. in Computer Science', year: '2017 - 2021' }
    ],
    experience: [
      { company: 'Stripe Inc.', title: 'Lead Frontend Engineer', duration: '2023 - Present', bullet: 'Spearheaded dashboard components revision using React.js and Redux, accelerating loading metric indexes by 35%.' },
      { company: 'Notion Labs', title: 'Senior Software Engineer', duration: '2021 - 2023', bullet: 'Managed collaborative database block editor optimizations, reducing document render lag times by 40%.' }
    ],
    skills: 'React.js, Redux Toolkit, JavaScript, TypeScript, Tailwind CSS, HTML5, Webpack, Git'
  });

  const handlePrint = () => {
    showToast('Preparing document layout...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleInputChange = (field, value) => {
    setCvData((prev) => ({ ...prev, [field]: value }));
  };

  const handleListChange = (section, idx, field, value) => {
    setCvData((prev) => {
      const updatedList = [...prev[section]];
      updatedList[idx] = { ...updatedList[idx], [field]: value };
      return { ...prev, [section]: updatedList };
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 no-print">
      
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
            Live Resume Builder
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Template select */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-semibold shadow-inner font-display">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg transition-all ${template === 'modern' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('classic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${template === 'classic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Classic Executive
            </button>
          </div>
          <Button variant="primary" icon={<Printer className="w-4.5 h-4.5" />} onClick={handlePrint}>
            Download PDF / Print
          </Button>
        </div>
      </div>

      {/* Mobile view segment toggle (Mobile Only) */}
      <div className="flex md:hidden bg-slate-100 p-1 rounded-2xl max-w-sm mx-auto shadow-inner select-none font-display mb-2">
        <button
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileView === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          📝 Edit Details
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mobileView === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          👁️ Live Preview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Accordion form entries */}
        <div className={`md:col-span-5 space-y-4 ${mobileView === 'edit' ? 'block' : 'hidden md:block'}`}>
          
          {/* Section 1: Header */}
          <Card padding="none" className="bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div
              onClick={() => setActiveSection(activeSection === 'header' ? '' : 'header')}
              className="flex items-center justify-between p-5 select-none cursor-pointer hover:bg-slate-50/50"
            >
              <h4 className="text-sm font-bold text-slate-700 font-display flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-blue-500" /> Header Information
              </h4>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeSection === 'header' ? 'rotate-180' : ''}`} />
            </div>
            {activeSection === 'header' && (
              <div className="p-5 border-t border-slate-50 space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" id="n" value={cvData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                  <Input label="Target Title" id="t" value={cvData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Email" id="e" value={cvData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  <Input label="Phone" id="p" value={cvData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                </div>
                <Input label="Address" id="a" value={cvData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                <Textarea label="Professional Summary" id="s" value={cvData.summary} onChange={(e) => handleInputChange('summary', e.target.value)} rows={3} />
              </div>
            )}
          </Card>

          {/* Section 2: Work History */}
          <Card padding="none" className="bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div
              onClick={() => setActiveSection(activeSection === 'work' ? '' : 'work')}
              className="flex items-center justify-between p-5 select-none cursor-pointer hover:bg-slate-50/50"
            >
              <h4 className="text-sm font-bold text-slate-700 font-display flex items-center gap-2">
                <Briefcase className="w-4.5 h-4.5 text-blue-500" /> Work History
              </h4>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeSection === 'work' ? 'rotate-180' : ''}`} />
            </div>
            {activeSection === 'work' && (
              <div className="p-5 border-t border-slate-50 space-y-6 text-left">
                {cvData.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-3.5 border-b border-slate-50 pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Position #{idx + 1}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Company" id={`c-${idx}`} value={exp.company} onChange={(e) => handleListChange('experience', idx, 'company', e.target.value)} />
                      <Input label="Role Title" id={`rt-${idx}`} value={exp.title} onChange={(e) => handleListChange('experience', idx, 'title', e.target.value)} />
                    </div>
                    <Input label="Duration" id={`d-${idx}`} value={exp.duration} onChange={(e) => handleListChange('experience', idx, 'duration', e.target.value)} />
                    <Textarea label="Core Impact description" id={`b-${idx}`} value={exp.bullet} onChange={(e) => handleListChange('experience', idx, 'bullet', e.target.value)} rows={3} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Section 3: Education */}
          <Card padding="none" className="bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div
              onClick={() => setActiveSection(activeSection === 'edu' ? '' : 'edu')}
              className="flex items-center justify-between p-5 select-none cursor-pointer hover:bg-slate-50/50"
            >
              <h4 className="text-sm font-bold text-slate-700 font-display flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-blue-500" /> Education
              </h4>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeSection === 'edu' ? 'rotate-180' : ''}`} />
            </div>
            {activeSection === 'edu' && (
              <div className="p-5 border-t border-slate-50 space-y-4 text-left">
                {cvData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Institution" id={`s-${idx}`} value={edu.school} onChange={(e) => handleListChange('education', idx, 'school', e.target.value)} />
                      <Input label="Degree" id={`deg-${idx}`} value={edu.degree} onChange={(e) => handleListChange('education', idx, 'degree', e.target.value)} />
                    </div>
                    <Input label="Year span" id={`y-${idx}`} value={edu.year} onChange={(e) => handleListChange('education', idx, 'year', e.target.value)} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Section 4: Skills */}
          <Card padding="none" className="bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div
              onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
              className="flex items-center justify-between p-5 select-none cursor-pointer hover:bg-slate-50/50"
            >
              <h4 className="text-sm font-bold text-slate-700 font-display flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-blue-500" /> Core Skills
              </h4>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeSection === 'skills' ? 'rotate-180' : ''}`} />
            </div>
            {activeSection === 'skills' && (
              <div className="p-5 border-t border-slate-50 text-left">
                <Textarea
                  label="Keywords (Comma separated)"
                  id="sk"
                  placeholder="React, CSS, Node..."
                  value={cvData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </Card>

        </div>

        {/* Right Side: A4 Page live preview rendering sheet */}
        <div className={`md:col-span-7 flex justify-center bg-slate-100/50 border border-slate-200/50 p-3 sm:p-6 md:p-8 rounded-3xl min-h-[800px] ${
          mobileView === 'preview' ? 'block' : 'hidden md:flex'
        }`}>
          
          <div
            id="print-sheet"
            className={`
              w-full max-w-[21cm] bg-white text-left p-5 sm:p-8 md:p-12 lg:p-[2cm] print:p-[2.5cm] border border-slate-200 shadow-2xl relative select-text print-area
              ${template === 'modern' ? 'font-sans' : 'font-serif'}
            `}
            style={{ minHeight: '29.7cm' }}
          >
            {/* Template layout: Modern */}
            {template === 'modern' ? (
              <div className="space-y-6.5">
                
                {/* Header */}
                <div className="border-b-2 border-slate-800 pb-5">
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none mb-1.5 uppercase font-display">
                    {cvData.name || 'Alex Mercer'}
                  </h1>
                  <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-widest font-display">
                    {cvData.title || 'Senior React Developer'}
                  </h3>
                  
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider font-display mt-4 leading-none">
                    {cvData.email && <span>{cvData.email}</span>}
                    {cvData.phone && <span>{cvData.phone}</span>}
                    {cvData.address && <span>{cvData.address}</span>}
                  </div>
                </div>

                {/* Summary */}
                {cvData.summary && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-display">Profile</h4>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      {cvData.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {cvData.experience.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-display">Professional History</h4>
                    <div className="space-y-4">
                      {cvData.experience.map((exp, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-baseline">
                            <h5 className="text-[13px] font-extrabold text-slate-700">
                              {exp.company} <span className="text-slate-400 font-medium">|</span> {exp.title}
                            </h5>
                            <span className="text-[11px] text-slate-400 font-bold uppercase font-display tracking-wider">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-slate-500 leading-normal pl-3 border-l border-slate-100 font-medium">
                            {exp.bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {cvData.education.length > 0 && (
                  <div className="space-y-3.5 pt-2">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-display">Academic credentials</h4>
                    <div className="space-y-3">
                      {cvData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-[12.5px]">
                          <span className="font-extrabold text-slate-700">
                            {edu.school} <span className="text-slate-400 font-medium">|</span> <span className="text-slate-500 font-semibold">{edu.degree}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase font-display tracking-wider">
                            {edu.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {cvData.skills && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-display">Core Skills</h4>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {cvData.skills.split(',').map((skill, idx) => (
                        <span key={idx} className="text-xs font-bold text-slate-600 bg-slate-100/70 border border-slate-200/30 px-2 py-0.5 rounded-lg font-display">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              // Template layout: Classic
              <div className="space-y-6 text-slate-800">
                <div className="text-center space-y-2 pb-4 border-b border-slate-300">
                  <h1 className="text-3xl font-bold tracking-tight uppercase leading-none">{cvData.name}</h1>
                  <h4 className="text-xs italic text-slate-500 uppercase tracking-widest font-bold font-display">{cvData.title}</h4>
                  <div className="flex justify-center gap-4 text-xs font-medium text-slate-500 italic mt-2">
                    <span>{cvData.email}</span>
                    <span>&bull;</span>
                    <span>{cvData.phone}</span>
                    <span>&bull;</span>
                    <span>{cvData.address}</span>
                  </div>
                </div>

                {cvData.summary && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-200 pb-1">Professional Summary</h4>
                    <p className="text-[13px] leading-relaxed italic">{cvData.summary}</p>
                  </div>
                )}

                {cvData.experience.length > 0 && (
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-200 pb-1">Employment History</h4>
                    <div className="space-y-4">
                      {cvData.experience.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline font-bold text-[13px]">
                            <span>{exp.title} &mdash; <span className="italic font-medium">{exp.company}</span></span>
                            <span className="text-slate-500 italic text-[11px]">{exp.duration}</span>
                          </div>
                          <p className="text-[12.5px] leading-relaxed text-slate-600 pl-4 list-item list-disc">{exp.bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.education.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-200 pb-1">Education</h4>
                    <div className="space-y-3">
                      {cvData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-[12.5px]">
                          <span>{edu.degree} &mdash; <span className="italic text-slate-600">{edu.school}</span></span>
                          <span className="text-[11px] text-slate-500 italic">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.skills && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-200 pb-1">Skills</h4>
                    <p className="text-xs leading-relaxed text-slate-600">{cvData.skills}</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Builder;

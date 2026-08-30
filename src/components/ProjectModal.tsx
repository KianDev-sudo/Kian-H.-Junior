import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Layers, 
  Code2, 
  Play, 
  Check, 
  Copy, 
  ExternalLink, 
  Search, 
  Plus, 
  Trash2, 
  Send, 
  Activity, 
  Cpu, 
  HardDrive, 
  Wrench,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ProjectItem } from '../types';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Student Record System State for Simulator
  const [students, setStudents] = useState([
    { admNo: 'STU/2026/001', name: 'Faith Akinyi Otieno', course: 'Diploma in ICT (Level 6)', gpa: '3.92', status: 'Coursework Complete' },
    { admNo: 'STU/2026/002', name: 'Kevin Kipchumba', course: 'Diploma in ICT (Level 6)', gpa: '3.75', status: 'Active Student' },
    { admNo: 'STU/2026/003', name: 'Mercy Chebet', course: 'Certificate in ICT', gpa: '3.80', status: 'Graduated' }
  ]);
  const [newAdm, setNewAdm] = useState('');
  const [newName, setNewName] = useState('');
  const [newCourse, setNewCourse] = useState('Diploma in ICT');
  const [searchAdm, setSearchAdm] = useState('');
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  // Network Simulator State
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [selectedVlan, setSelectedVlan] = useState<string>('All');
  const [isPinging, setIsPinging] = useState(false);

  // Hardware Diagnostics State
  const [selectedFault, setSelectedFault] = useState<string>('no-power');
  const [diagnosticProgress, setDiagnosticProgress] = useState<number>(0);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdm || !newName) return;
    const newRecord = {
      admNo: newAdm.toUpperCase(),
      name: newName,
      course: newCourse,
      gpa: (3.0 + Math.random() * 0.95).toFixed(2),
      status: 'Active Student'
    };
    setStudents([newRecord, ...students]);
    setNewAdm('');
    setNewName('');
    confetti({ particleCount: 25, spread: 40 });
  };

  const handleDeleteStudent = (adm: string) => {
    setStudents(students.filter(s => s.admNo !== adm));
  };

  const handleGenerateTranscript = (student: typeof students[0]) => {
    setGeneratedReport(`=== THE KISUMU NATIONAL POLYTECHNIC ===
OFFICIAL ACADEMIC TRANSCRIPT PREVIEW
Student Name: ${student.name}
Admission No: ${student.admNo}
Course: ${student.course}
Cumulative GPA: ${student.gpa} / 4.00
Status: ${student.status}
Issued: ${new Date().toLocaleDateString()}
Authorized by: Computing and Informatics Department`);
  };

  const handleRunPing = (source: string, destination: string) => {
    setIsPinging(true);
    setPingStatus(`Pinging ${destination} from ${source} with 32 bytes of data...`);
    setTimeout(() => {
      setPingStatus(`Reply from 192.168.10.1: bytes=32 time=1.8ms TTL=128
Reply from 192.168.10.1: bytes=32 time=1.4ms TTL=128
Reply from 192.168.10.1: bytes=32 time=1.5ms TTL=128
Ping statistics: 3 packets transmitted, 3 received, 0% packet loss. RTT avg = 1.56ms.`);
      setIsPinging(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto no-print">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#16161A] rounded-2xl border border-slate-200 dark:border-[#25252A] shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#25252A] flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-[#0D0D0F]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60">
                {project.category}
              </span>
              <span className="text-xs text-slate-400 dark:text-[#71717A] font-mono">
                {project.type}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F4F4F5]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 dark:border-[#25252A] bg-white dark:bg-[#16161A] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture & Scope</span>
          </button>

          {project.demoType !== 'general' && (
            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-500" />
              <span>Interactive Simulator</span>
            </button>
          )}

          {project.codeSnippet && (
            <button
              onClick={() => setActiveTab('code')}
              className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code Snippet</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A] mb-2">
                  Full Project Summary
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-[#A1A1AA] leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A] mb-2">
                  Key Technical Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/80 dark:border-[#25252A] text-xs sm:text-sm text-slate-700 dark:text-[#A1A1AA] flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics if available */}
              {project.metrics && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A] mb-2">
                    Key Performance Indicators
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-indigo-50/50 dark:bg-[#0D0D0F] border border-indigo-100 dark:border-[#25252A] text-center">
                        <div className="text-xs text-slate-500 dark:text-[#71717A]">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold text-indigo-700 dark:text-indigo-400 mt-1">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A] mb-2">
                  Technologies Utilized
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#25252A] text-slate-800 dark:text-[#F4F4F5] border border-slate-200 dark:border-[#25252A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SIMULATORS */}
          {activeTab === 'simulator' && (
            <div>
              {/* Simulator 1: Student Record CRUD */}
              {project.demoType === 'crud-simulator' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-[#0D0D0F] border border-indigo-200 dark:border-[#25252A] text-xs text-indigo-800 dark:text-indigo-300 flex items-center justify-between">
                    <span>💡 <strong>Interactive TKNP Student Database Simulator</strong>: Test creating records, querying GPA, and producing automated transcripts.</span>
                  </div>

                  {/* Add Student Form */}
                  <form onSubmit={handleAddStudent} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200 dark:border-[#25252A] grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 dark:text-[#71717A] uppercase">Admission No</label>
                      <input
                        type="text"
                        placeholder="TKNP/B/9999"
                        value={newAdm}
                        onChange={(e) => setNewAdm(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#16161A] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 dark:text-[#71717A] uppercase">Full Name</label>
                      <input
                        type="text"
                        placeholder="Student Full Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#16161A] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 dark:text-[#71717A] uppercase">Course</label>
                      <select
                        value={newCourse}
                        onChange={(e) => setNewCourse(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#16161A] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5]"
                      >
                        <option value="Diploma in ICT (Level 6)">Diploma in ICT (Level 6)</option>
                        <option value="Certificate in ICT">Certificate in ICT</option>
                        <option value="Computer Science">Computer Science</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Insert Record</span>
                      </button>
                    </div>
                  </form>

                  {/* Student Table */}
                  <div className="border border-slate-200 dark:border-[#25252A] rounded-xl overflow-hidden shadow-xs">
                    <div className="p-3 bg-slate-100 dark:bg-[#16161A] border-b border-slate-200 dark:border-[#25252A] flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-[#F4F4F5]">Database Table: `students` ({students.length} Records)</span>
                      <span className="text-[11px] text-slate-500 dark:text-[#71717A]">MySQL Engine: InnoDB</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-[#0D0D0F] text-slate-500 dark:text-[#71717A] uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-2">Adm No</th>
                            <th className="px-4 py-2">Full Name</th>
                            <th className="px-4 py-2">Course</th>
                            <th className="px-4 py-2">GPA</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-[#25252A] text-slate-700 dark:text-[#A1A1AA]">
                          {students.map((s) => (
                            <tr key={s.admNo} className="hover:bg-slate-50/50 dark:hover:bg-[#25252A]/40">
                              <td className="px-4 py-2.5 font-mono font-medium text-indigo-600 dark:text-indigo-400">{s.admNo}</td>
                              <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-[#F4F4F5]">{s.name}</td>
                              <td className="px-4 py-2.5">{s.course}</td>
                              <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">{s.gpa}</td>
                              <td className="px-4 py-2.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-[#25252A] text-slate-600 dark:text-[#A1A1AA]">
                                  {s.status}
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-right space-x-2">
                                <button
                                  onClick={() => handleGenerateTranscript(s)}
                                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                                >
                                  Transcript
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(s.admNo)}
                                  className="text-xs text-rose-500 hover:text-rose-700"
                                >
                                  <Trash2 className="w-3.5 h-3.5 inline" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Transcript Report Preview Output */}
                  {generatedReport && (
                    <div className="p-4 rounded-xl bg-[#0D0D0F] text-emerald-400 font-mono text-xs space-y-2 border border-[#25252A]">
                      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[#25252A]">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          <span>Generated Transcript Output (Tkinter/ReportLab PDF Buffer)</span>
                        </span>
                        <button
                          onClick={() => setGeneratedReport(null)}
                          className="text-xs text-slate-400 hover:text-[#F4F4F5]"
                        >
                          Dismiss
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap">{generatedReport}</pre>
                    </div>
                  )}
                </div>
              )}

              {/* Simulator 2: Cisco Packet Tracer Network Topology */}
              {project.demoType === 'network-topology' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-[#0D0D0F] border border-indigo-200 dark:border-[#25252A] text-xs text-indigo-800 dark:text-indigo-300">
                    <span>⚡ <strong>Cisco Small Office LAN Interactive Topology</strong>: Test simulated packet routing and ICMP pings across isolated VLANs.</span>
                  </div>

                  {/* Visual Topology Diagram */}
                  <div className="p-6 rounded-2xl bg-[#0D0D0F] text-white border border-[#25252A] space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#25252A]">
                      <div className="font-mono text-xs text-[#A1A1AA]">Gateway: 192.168.10.1/24 (Cisco 2911 Router)</div>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isPinging}
                          onClick={() => handleRunPing('Admin PC (192.168.10.25)', 'Server (192.168.10.1)')}
                          className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isPinging ? 'Pinging...' : 'Ping Test: PC to Gateway'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Nodes Visual Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono text-xs">
                      <div className="p-4 rounded-xl bg-[#16161A] border border-[#25252A] space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 mx-auto flex items-center justify-center">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-[#F4F4F5]">Cisco 2911 Router</div>
                        <div className="text-[11px] text-[#A1A1AA]">IP: 192.168.10.1 (NAT/DHCP)</div>
                        <div className="text-[10px] text-emerald-400">Port Gi0/0: UP</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#16161A] border border-[#25252A] space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 mx-auto flex items-center justify-center">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-[#F4F4F5]">Cisco 2960 Switch</div>
                        <div className="text-[11px] text-[#A1A1AA]">VLAN 10, 20, 30 Trunk</div>
                        <div className="text-[10px] text-emerald-400">STP: Forwarding</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#16161A] border border-[#25252A] space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 mx-auto flex items-center justify-center">
                          <HardDrive className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-[#F4F4F5]">Workstation PC</div>
                        <div className="text-[11px] text-[#A1A1AA]">IP: 192.168.10.25 (Admin)</div>
                        <div className="text-[10px] text-emerald-400">DHCP Bound</div>
                      </div>
                    </div>

                    {/* Ping Console Output */}
                    {pingStatus && (
                      <div className="p-4 rounded-xl bg-[#16161A] border border-[#25252A] font-mono text-xs text-emerald-400">
                        <div className="text-slate-500 mb-1">Cisco IOS Packet Tracer ICMP Session:</div>
                        <pre className="whitespace-pre-wrap">{pingStatus}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Simulator 3: ICT Hardware Diagnostics */}
              {project.demoType === 'hardware-diagnostic' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-[#0D0D0F] border border-indigo-200 dark:border-[#25252A] text-xs text-indigo-800 dark:text-indigo-300">
                    <span>🔧 <strong>Interactive Hardware Fault Diagnoser & POST Beep Code Matrix</strong></span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedFault('no-power')}
                      className={`p-4 rounded-xl text-left border transition-all text-xs ${
                        selectedFault === 'no-power'
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-[#0D0D0F] text-indigo-900 dark:text-indigo-200 font-semibold'
                          : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#25252A]'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-500 mb-1" />
                      <div className="dark:text-[#F4F4F5]">Symptom: No Power / Dead PSU</div>
                    </button>

                    <button
                      onClick={() => setSelectedFault('ram-beep')}
                      className={`p-4 rounded-xl text-left border transition-all text-xs ${
                        selectedFault === 'ram-beep'
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-[#0D0D0F] text-indigo-900 dark:text-indigo-200 font-semibold'
                          : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#25252A]'
                      }`}
                    >
                      <Activity className="w-4 h-4 text-indigo-500 mb-1" />
                      <div className="dark:text-[#F4F4F5]">Symptom: 3 Beeps & No Video</div>
                    </button>

                    <button
                      onClick={() => setSelectedFault('overheat')}
                      className={`p-4 rounded-xl text-left border transition-all text-xs ${
                        selectedFault === 'overheat'
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-[#0D0D0F] text-indigo-900 dark:text-indigo-200 font-semibold'
                          : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#25252A]'
                      }`}
                    >
                      <Wrench className="w-4 h-4 text-emerald-500 mb-1" />
                      <div className="dark:text-[#F4F4F5]">Symptom: Thermal Shutdown</div>
                    </button>
                  </div>

                  {/* Fault Resolution Guide */}
                  <div className="p-6 rounded-2xl bg-[#0D0D0F] text-white font-mono text-xs space-y-4 border border-[#25252A]">
                    <div className="flex items-center justify-between border-b border-[#25252A] pb-3">
                      <span className="font-bold text-indigo-400">Step-by-Step Diagnostic Protocol</span>
                      <span className="text-[#A1A1AA]">TKNP Maintenance Lab Standard</span>
                    </div>

                    {selectedFault === 'no-power' && (
                      <div className="space-y-2 text-slate-300">
                        <p className="text-amber-400 font-semibold">1. Multimeter Power Supply Verification:</p>
                        <p>• Short Green wire (PS_ON) to Black (COM) on 24-pin ATX to jumpstart fan.</p>
                        <p>• Measure DC voltage: Orange=+3.3V, Red=+5.0V, Yellow=+12.0V, Purple=+5VSB.</p>
                        <p className="text-emerald-400"> Resolution: If +12V is below +11.4V, replace capacitor or power supply unit.</p>
                      </div>
                    )}

                    {selectedFault === 'ram-beep' && (
                      <div className="space-y-2 text-slate-300">
                        <p className="text-indigo-400 font-semibold">1. BIOS POST Beep Analysis:</p>
                        <p>• 3 Long Continuous Beeps indicates Memory parity failure or dirty DIMM contacts.</p>
                        <p>• Unclip DDR4 RAM stick. Inspect gold fingers for oxidation.</p>
                        <p>• Clean contacts using 99% isopropyl alcohol or precision eraser.</p>
                        <p className="text-emerald-400"> Resolution: Reseat in Channel A Slot 2, verify audible click on locking latches.</p>
                      </div>
                    )}

                    {selectedFault === 'overheat' && (
                      <div className="space-y-2 text-slate-300">
                        <p className="text-rose-400 font-semibold">1. Thermal Interface Material & Heat Sink Service:</p>
                        <p>• Remove CPU cooler fan; clean dust bunnies from aluminum fin stack.</p>
                        <p>• Wipe dried old paste with lint-free wipes and alcohol.</p>
                        <p>• Dispense pea-sized dot of high-conductivity thermal paste in center of IHS.</p>
                        <p className="text-emerald-400"> Resolution: Re-clamp heatsink crosswise; BIOS CPU Temp drops from 89°C to 38°C.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CODE SNIPPET */}
          {activeTab === 'code' && project.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#16161A] text-slate-300 px-4 py-2 rounded-t-xl text-xs font-mono border-t border-x border-[#25252A]">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span className="text-[#F4F4F5]">{project.codeSnippet.filename}</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 rounded-b-xl bg-[#0D0D0F] text-slate-200 font-mono text-xs overflow-x-auto border border-[#25252A] max-h-96">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-[#25252A] bg-slate-50 dark:bg-[#16161A] flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-[#A1A1AA]">Brighton Omondi Umira — Technical Portfolio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-slate-800 dark:text-[#F4F4F5] font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

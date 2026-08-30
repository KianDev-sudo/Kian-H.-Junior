import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ArrowLeft, 
  Sparkles, 
  CornerDownLeft, 
  Maximize2, 
  Minimize2, 
  Trash2 
} from 'lucide-react';
import { 
  educationData, 
  experienceData, 
  skillCategories, 
  projectsData, 
  certificationsData, 
  refereesData 
} from '../data/cvData';
import { useProfile } from '../context/ProfileContext';
import { ViewMode } from '../types';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'success' | 'error';
  text: string;
}

interface InteractiveTerminalProps {
  onBackToPortfolio: () => void;
  setViewMode: (mode: ViewMode) => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ 
  onBackToPortfolio,
  setViewMode 
}) => {
  const { theme, setTheme } = useTheme();
  const { profile, openProfileModal } = useProfile();
  const [inputVal, setInputVal] = useState('');
  const username = profile.name ? profile.name.toLowerCase().replace(/\s+/g, '_') : 'brighton';

  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: `${profile.name} — ICT Interactive Terminal CLI [Version 2.5.0]` },
    { type: 'system', text: `(c) 2026 ${profile.name}. All rights reserved.` },
    { type: 'system', text: `Type 'help' to see all available commands or 'gui' to return to web view.\n` },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'input', text: `${username}@terminal:~$ ${trimmed}` }
    ];

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();
    const subArg = args[1]?.toLowerCase();

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  about           - View ${profile.name}'s career objective & summary
  skills          - List technical skills and proficiency levels
  experience      - View industrial attachments (CA Kenya & KPLC)
  projects        - List academic and full-stack software projects
  education       - View Diploma ICT coursework at TKNP
  certifications  - View Cisco NetAcad & HP LIFE certificates
  contact         - Get phone, email, and WhatsApp connection
  settings        - Launch GUI Profile Management & Photo editor
  referees        - List verified academic & liaison referees
  ping <host>     - Ping ca.go.ke or kplc.co.ke
  theme <mode>    - Change theme: 'theme light', 'theme dark', 'theme system'
  gui             - Switch to Graphical Web Portfolio
  cv              - Switch to Printable Formal CV Sheet
  hire            - Sudo dispatch interview request & celebrate!
  clear           - Clear terminal screen`
        });
        break;

      case 'about':
      case 'bio':
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `NAME: ${profile.name}
TITLE: ${profile.tagline}
LOCATION: ${profile.location}
STATUS: ${profile.status}

OBJECTIVE:
${profile.careerObjective}`
        });
        break;

      case 'skills':
        const skillsText = skillCategories.map(c => 
          `[${c.category.toUpperCase()}]\n` + c.skills.map(s => `  • ${s.name.padEnd(25)} [${s.level}]`).join('\n')
        ).join('\n\n');
        newHistory.push({ type: 'output', text: skillsText });
        break;

      case 'experience':
      case 'attachments':
        const expText = experienceData.map(e => 
          `▶ ${e.role.toUpperCase()} — ${e.organization} (${e.period})
  Department: ${e.department}
  Highlights:
` + e.highlights.map(h => `    - ${h}`).join('\n')
        ).join('\n\n');
        newHistory.push({ type: 'output', text: expText });
        break;

      case 'projects':
        const projText = projectsData.map(p => 
          `★ ${p.title} [${p.category}]
  Tech: ${p.technologies.join(', ')}
  Summary: ${p.summary}`
        ).join('\n\n');
        newHistory.push({ type: 'output', text: projText });
        break;

      case 'education':
        const edu = educationData[0];
        newHistory.push({
          type: 'output',
          text: `INSTITUTION: ${edu.institution}
DEGREE: ${edu.degree} (${edu.level})
STATUS: ${edu.status}
EXPECTED GRADUATION: ${edu.expectedGraduation}
COURSEWORK: ${edu.coursework.join(', ')}`
        });
        break;

      case 'certifications':
        const certText = certificationsData.map(c => 
          `✔ ${c.title} — ${c.issuer} (${c.year})`
        ).join('\n');
        newHistory.push({ type: 'output', text: certText });
        break;

      case 'referees':
        const refText = refereesData.map(r => 
          `• ${r.name} — ${r.title}, ${r.institution} (Tel: ${r.phone})`
        ).join('\n');
        newHistory.push({ type: 'output', text: refText });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `EMAIL:    ${profile.email}
PHONE:    ${profile.phone}
WHATSAPP: ${profile.whatsapp}
LOCATION: ${profile.location}`
        });
        break;

      case 'settings':
      case 'profile':
      case 'photo':
        openProfileModal();
        newHistory.push({
          type: 'success',
          text: `Opening Profile Management & Settings dialog...`
        });
        break;

      case 'ping':
        const host = subArg || 'ca.go.ke';
        newHistory.push({
          type: 'success',
          text: `PING ${host} (197.248.33.2): 56 data bytes
64 bytes from 197.248.33.2: icmp_seq=0 ttl=58 time=12.421 ms
64 bytes from 197.248.33.2: icmp_seq=1 ttl=58 time=11.890 ms
64 bytes from 197.248.33.2: icmp_seq=2 ttl=58 time=12.015 ms
--- ${host} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss`
        });
        break;

      case 'theme':
        if (['light', 'dark', 'system'].includes(subArg)) {
          setTheme(subArg as any);
          newHistory.push({ type: 'success', text: `Theme successfully switched to '${subArg}' mode.` });
        } else {
          newHistory.push({ type: 'error', text: `Usage: theme <light | dark | system>` });
        }
        break;

      case 'hire':
      case 'sudo':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: 'success',
          text: `🎉 Sudo access granted! Thank you for considering ${profile.name}.
Dispatching email inquiry to ${profile.email}...`
        });
        setTimeout(() => {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Interview Offer for ${profile.name}`)}`;
        }, 1000);
        break;

      case 'gui':
      case 'portfolio':
        setViewMode('portfolio');
        return;

      case 'cv':
        setViewMode('cv-preview');
        return;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `bash: command not found: '${command}'. Type 'help' for a list of valid commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextIdx = historyPointer + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryPointer(-1);
          setInputVal('');
        } else {
          setHistoryPointer(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono p-4 sm:p-8 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-4">
        
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-t-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{username}@workspace: ~</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onBackToPortfolio}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="p-6 bg-slate-900/90 border-x border-b border-slate-800 rounded-b-2xl min-h-[60vh] max-h-[75vh] overflow-y-auto space-y-3 shadow-2xl text-xs sm:text-sm cursor-text"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'input' && (
                <div className="text-indigo-400 font-semibold">{line.text}</div>
              )}
              {line.type === 'system' && (
                <div className="text-slate-400">{line.text}</div>
              )}
              {line.type === 'output' && (
                <pre className="text-slate-200 whitespace-pre-wrap font-mono">{line.text}</pre>
              )}
              {line.type === 'success' && (
                <pre className="text-emerald-400 whitespace-pre-wrap font-mono">{line.text}</pre>
              )}
              {line.type === 'error' && (
                <div className="text-rose-400 font-medium">{line.text}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold shrink-0">{username}@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white focus:outline-hidden font-mono text-xs sm:text-sm"
              autoFocus
              placeholder="type 'help' or command..."
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
          <span>Quick commands:</span>
          {['help', 'skills', 'experience', 'projects', 'education', 'contact', 'settings', 'hire', 'gui', 'cv'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Terminal, 
  Building2, 
  FolderGit2, 
  Award, 
  BookOpen, 
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { 
  profileData, 
  experienceData, 
  skillCategories, 
  projectsData, 
  certificationsData,
  educationData
} from '../data/cvData';
import { ViewMode } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setViewMode: (mode: ViewMode) => void;
  onSelectProject?: (projectId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ 
  isOpen, 
  onClose,
  setViewMode
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search results collections
  const matchedSkills = skillCategories.flatMap(c => 
    c.skills.filter(s => 
      s.name.toLowerCase().includes(cleanQuery) || 
      s.tags?.some(t => t.toLowerCase().includes(cleanQuery))
    ).map(s => ({ ...s, category: c.category }))
  );

  const matchedProjects = projectsData.filter(p => 
    p.title.toLowerCase().includes(cleanQuery) ||
    p.summary.toLowerCase().includes(cleanQuery) ||
    p.technologies.some(t => t.toLowerCase().includes(cleanQuery))
  );

  const matchedExperiences = experienceData.filter(e => 
    e.organization.toLowerCase().includes(cleanQuery) ||
    e.role.toLowerCase().includes(cleanQuery) ||
    e.highlights.some(h => h.toLowerCase().includes(cleanQuery))
  );

  const matchedCerts = certificationsData.filter(c => 
    c.title.toLowerCase().includes(cleanQuery) ||
    c.issuer.toLowerCase().includes(cleanQuery)
  );

  const hasResults = cleanQuery.length > 0 && (
    matchedSkills.length > 0 || 
    matchedProjects.length > 0 || 
    matchedExperiences.length > 0 || 
    matchedCerts.length > 0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-sm no-print">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search skills, projects, certifications, or attachments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
            autoFocus
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          ) : (
            <kbd className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-md font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {query.trim() === '' ? (
            <div className="text-center py-8 space-y-3">
              <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Navigation & Search
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto pt-2">
                {['Python', 'React', 'MySQL', 'Cisco', 'CA Kenya', 'KPLC', 'Android', 'Hardware'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="px-3 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No results found for "{query}". Try another term like "Python", "Networking", or "KPLC".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Skills Results */}
              {matchedSkills.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    Skills ({matchedSkills.length})
                  </div>
                  {matchedSkills.slice(0, 5).map((skill, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setViewMode('portfolio');
                        onClose();
                        window.location.hash = '#skills';
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="text-[10px] text-slate-400">({skill.category})</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Results */}
              {matchedProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    Projects ({matchedProjects.length})
                  </div>
                  {matchedProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setViewMode('portfolio');
                        onClose();
                        window.location.hash = '#projects';
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-indigo-500" />
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.title}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{p.summary}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Experience Results */}
              {matchedExperiences.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    Industrial Attachments ({matchedExperiences.length})
                  </div>
                  {matchedExperiences.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        setViewMode('portfolio');
                        onClose();
                        window.location.hash = '#experience';
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-500" />
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{e.role} — {e.organization}</div>
                          <div className="text-[10px] text-slate-400">{e.department}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Results */}
              {matchedCerts.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    Certifications ({matchedCerts.length})
                  </div>
                  {matchedCerts.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setViewMode('portfolio');
                        onClose();
                        window.location.hash = '#certifications';
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{c.title}</div>
                          <div className="text-[10px] text-slate-400">{c.issuer}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Brighton Omondi Umira — Kisumu, Kenya</span>
          <span className="font-mono">{profileData.phone}</span>
        </div>

      </div>
    </div>
  );
};

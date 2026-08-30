import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Terminal, 
  Sliders, 
  Search, 
  Send
} from 'lucide-react';
import { ViewMode } from '../types';
import { useProfile } from '../context/ProfileContext';

interface BottomNavDockProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenSearch?: () => void;
}

export const BottomNavDock: React.FC<BottomNavDockProps> = ({
  viewMode,
  setViewMode,
  onOpenSearch
}) => {
  const { openProfileModal } = useProfile();

  const mainTabs: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'portfolio', label: 'Portfolio', icon: Sparkles },
    { id: 'cv-preview', label: 'CV Sheet', icon: FileText },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
  ];

  return (
    <aside 
      aria-label="Floating View Navigation"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 no-print max-w-[96vw] sm:max-w-fit"
    >
      <nav 
        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-white/95 dark:bg-[#16161A]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#2A2A30] shadow-2xl shadow-slate-900/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/5 transition-all"
      >
        {/* Core Primary Views - Strict Uniform Width & Height */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.id;

            return (
              <button
                key={tab.id}
                id={`bottom-tab-${tab.id}`}
                onClick={() => setViewMode(tab.id)}
                className={`w-24 sm:w-28 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-semibold transition-all select-none ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-500/50 scale-[1.02]'
                    : 'text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#25252A]'
                }`}
                title={`Switch to ${tab.label} mode`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-[#A1A1AA]'}`} />
                <span className="truncate tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-[#25252A] mx-0.5 sm:mx-1 shrink-0" />

        {/* Secondary Utility Actions - Uniform Equal Width */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            id="bottom-tab-profile-settings"
            onClick={openProfileModal}
            className="w-20 sm:w-24 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-medium text-slate-600 dark:text-[#A1A1AA] hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors"
            title="Profile & Photo Settings"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
            <span className="truncate text-xs">Settings</span>
          </button>

          {onOpenSearch && (
            <button
              id="bottom-tab-search"
              onClick={onOpenSearch}
              className="w-20 sm:w-24 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-medium text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors"
              title="Search Portfolio (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              <span className="truncate text-xs">Search</span>
            </button>
          )}

          <a
            id="bottom-tab-contact"
            href="#contact"
            onClick={() => {
              if (viewMode !== 'portfolio') {
                setViewMode('portfolio');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="w-20 sm:w-24 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 transition-all hover:scale-[1.02]"
            title="Jump to Contact / Hire"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate text-xs">Contact</span>
          </a>
        </div>
      </nav>
    </aside>
  );
};

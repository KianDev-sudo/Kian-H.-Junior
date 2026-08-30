import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  Terminal, 
  FileText, 
  Heart,
  Sliders
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { ViewMode } from '../types';

interface FooterProps {
  setViewMode: (mode: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setViewMode }) => {
  const { profile, isPhotoVisible, openProfileModal } = useProfile();
  const [timeInKisumu, setTimeInKisumu] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeInKisumu(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  return (
    <footer className="border-t border-slate-200 dark:border-[#25252A] bg-white dark:bg-[#0D0D0F] transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-[#25252A]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-indigo-500/30 flex items-center justify-center font-bold text-sm bg-indigo-600 text-white shrink-0">
                {profile.profileImage && isPhotoVisible ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  getInitials(profile.name)
                )}
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-[#F4F4F5]">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA] max-w-md">
              Diploma ICT student (Level 6) at The Kisumu National Polytechnic with industrial attachment background at Communications Authority of Kenya & Kenya Power.
            </p>
          </div>

          {/* Kisumu Local Time Widget & Location */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openProfileModal}
              className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#16161A] dark:hover:bg-[#25252A] border border-slate-200/80 dark:border-[#25252A] flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#A1A1AA] font-medium"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              <span>Profile Settings</span>
            </button>

            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#16161A] border border-slate-200/80 dark:border-[#25252A] flex items-center gap-2 text-xs font-mono">
              <Clock className="w-4 h-4 text-indigo-500 animate-spin-slow" />
              <span className="text-slate-600 dark:text-[#F4F4F5] font-semibold">{timeInKisumu}</span>
              <span className="text-[10px] text-slate-400 dark:text-[#71717A]">(EAT / Kisumu, KE)</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#16161A] dark:hover:bg-[#25252A] text-slate-600 dark:text-[#A1A1AA] transition-colors border border-slate-200/80 dark:border-[#25252A]"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#A1A1AA]">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setViewMode('portfolio')}
              className="w-28 sm:w-32 py-2 rounded-xl bg-slate-100 dark:bg-[#16161A] hover:bg-indigo-50 dark:hover:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition-colors border border-slate-200/80 dark:border-[#25252A] text-center"
            >
              Portfolio
            </button>
            <button
              onClick={() => setViewMode('cv-preview')}
              className="w-28 sm:w-32 py-2 rounded-xl bg-slate-100 dark:bg-[#16161A] hover:bg-indigo-50 dark:hover:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition-colors border border-slate-200/80 dark:border-[#25252A] text-center"
            >
              Printable CV
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className="w-28 sm:w-32 py-2 rounded-xl bg-slate-100 dark:bg-[#16161A] hover:bg-indigo-50 dark:hover:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition-colors border border-slate-200/80 dark:border-[#25252A] text-center"
            >
              Interactive CLI
            </button>
            <button
              onClick={openProfileModal}
              className="w-28 sm:w-32 py-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs transition-colors border border-indigo-200/70 dark:border-indigo-900/60 text-center"
            >
              Settings
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

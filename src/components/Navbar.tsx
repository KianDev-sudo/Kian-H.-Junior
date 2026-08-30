import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Menu, 
  X, 
  FileText, 
  Terminal, 
  Download, 
  Printer, 
  Search, 
  Sparkles,
  Phone,
  Mail,
  ChevronDown,
  Sliders
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { ViewMode } from '../types';
import confetti from 'canvas-confetti';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ viewMode, setViewMode, onOpenSearch }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const { profile, isPhotoVisible, openProfileModal, isCustomized } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrintOrDownload = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 }
    });
    if (viewMode !== 'cv-preview') {
      setViewMode('cv-preview');
      setTimeout(() => {
        window.print();
      }, 400);
    } else {
      window.print();
    }
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0D0D0F]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#25252A] shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-home-button"
              onClick={() => {
                setViewMode('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all shadow-md group-hover:scale-105 duration-200 shrink-0 bg-slate-900 flex items-center justify-center">
                {profile.profileImage && isPhotoVisible ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                    {getInitials(profile.name)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0D0D0F]" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-[#F4F4F5] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5 sm:gap-2">
                  <span className="truncate max-w-[130px] sm:max-w-none">{profile.name}</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                    Available
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-[#A1A1AA] truncate max-w-[150px] sm:max-w-none">
                  Full-Stack & IT Support • Kisumu
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          {viewMode === 'portfolio' && (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#16161A] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}

          {/* Action Center: View Switcher, Search, Dark Toggle, Profile Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#16161A] transition-colors flex items-center gap-1.5 text-xs font-mono border border-slate-200 dark:border-[#25252A] bg-transparent dark:bg-[#16161A]/50"
              title="Search Portfolio & Skills (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-slate-400 dark:text-[#71717A]">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-slate-200/60 dark:bg-[#25252A] text-slate-600 dark:text-[#A1A1AA] rounded">⌘K</kbd>
            </button>

            {/* Profile Settings Trigger */}
            <button
              id="profile-settings-btn"
              onClick={openProfileModal}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#25252A] bg-white/80 dark:bg-[#16161A] text-slate-700 dark:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 shadow-xs relative"
              title="Profile Settings & Photo Customization"
              aria-label="Profile Settings"
            >
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span className="hidden xl:inline text-xs font-medium">Profile Settings</span>
              {isCustomized && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#16161A]" />
              )}
            </button>

            {/* Dark Mode Toggle Settings */}
            <div className="relative">
              <button
                id="theme-toggle-button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-[#25252A] bg-white/80 dark:bg-[#16161A] text-slate-700 dark:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors flex items-center gap-1 shadow-xs"
                aria-label="Toggle theme settings"
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {themeDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setThemeDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">
                      Appearance Theme
                    </div>
                    <button
                      id="theme-opt-light"
                      onClick={() => {
                        setTheme('light');
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors ${
                        theme === 'light'
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'text-slate-700 dark:text-[#A1A1AA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Light Mode</span>
                      </div>
                      {theme === 'light' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </button>
                    <button
                      id="theme-opt-dark"
                      onClick={() => {
                        setTheme('dark');
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors ${
                        theme === 'dark'
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'text-slate-700 dark:text-[#A1A1AA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Moon className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Dark Mode</span>
                      </div>
                      {theme === 'dark' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </button>
                    <button
                      id="theme-opt-system"
                      onClick={() => {
                        setTheme('system');
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors ${
                        theme === 'system'
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'text-slate-700 dark:text-[#A1A1AA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" />
                        <span>System Auto</span>
                      </div>
                      {theme === 'system' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Quick Print / Download CV button */}
            <button
              id="quick-download-cv-btn"
              onClick={handlePrintOrDownload}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print CV</span>
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-slate-600 dark:text-[#A1A1AA] hover:bg-slate-100 dark:hover:bg-[#16161A]"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-[#25252A] bg-white dark:bg-[#0D0D0F] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {/* Mobile view switcher */}
          <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A]">
            <button
              onClick={() => {
                setViewMode('portfolio');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-xs text-center font-medium rounded-md ${
                viewMode === 'portfolio' ? 'bg-white dark:bg-[#25252A] text-indigo-600 dark:text-[#F4F4F5] shadow-xs' : 'text-slate-600 dark:text-[#A1A1AA]'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => {
                setViewMode('cv-preview');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-xs text-center font-medium rounded-md ${
                viewMode === 'cv-preview' ? 'bg-white dark:bg-[#25252A] text-indigo-600 dark:text-[#F4F4F5] shadow-xs' : 'text-slate-600 dark:text-[#A1A1AA]'
              }`}
            >
              CV Sheet
            </button>
            <button
              onClick={() => {
                setViewMode('terminal');
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-xs text-center font-medium rounded-md ${
                viewMode === 'terminal' ? 'bg-white dark:bg-[#25252A] text-indigo-600 dark:text-[#F4F4F5] shadow-xs' : 'text-slate-600 dark:text-[#A1A1AA]'
              }`}
            >
              Terminal
            </button>
          </div>

          {/* Profile Settings Mobile Button */}
          <button
            onClick={() => {
              openProfileModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span>Profile Photo & Info Settings</span>
            </div>
            <span className="text-[10px] bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 px-2 py-0.5 rounded-full font-bold">Manage</span>
          </button>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setViewMode('portfolio');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#16161A]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handlePrintOrDownload();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save CV as PDF</span>
            </button>
            <a
              href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hello Brighton, I reviewed your CV and would like to discuss an opportunity.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Quick WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

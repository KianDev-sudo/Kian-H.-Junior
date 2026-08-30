import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Printer, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Copy, 
  Terminal, 
  Building2, 
  Award, 
  Briefcase, 
  Code2, 
  Network, 
  ShieldCheck,
  Send,
  ExternalLink,
  Sliders,
  Camera
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { ViewMode } from '../types';
import confetti from 'canvas-confetti';

interface HeroProps {
  setViewMode: (mode: ViewMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ setViewMode }) => {
  const { profile, openProfileModal } = useProfile();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roleTitles = profile.roleTitles?.length ? profile.roleTitles : [
    'Full-Stack Web Developer',
    'ICT Support & Infrastructure Engineer',
    'Network Administrator',
    'Python & Systems Developer'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roleTitles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrintCV = () => {
    setViewMode('cv-preview');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-violet-500/5 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
          
          {/* Main Hero Information */}
          <div className="flex-1 space-y-6 max-w-3xl">
            {/* Status Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] text-slate-700 dark:text-[#F4F4F5] text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.status}</span>
              <span className="text-slate-400 dark:text-[#52525B]">•</span>
              <span className="text-slate-600 dark:text-[#A1A1AA] font-normal">Level 6 ICT Diploma Completed</span>
            </div>

            {/* Name and Animated Role Display */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-[#F4F4F5]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-300 dark:from-indigo-400 dark:to-indigo-200">{profile.name}</span>
              </h1>
              
              <div className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                <span className="mr-2 text-slate-400 dark:text-[#71717A]">Specializing in:</span>
                <span className="text-indigo-600 dark:text-indigo-400 transition-all duration-300 inline-block font-mono">
                  {roleTitles[currentRoleIndex]}
                </span>
              </div>
            </div>

            {/* Career Objective Excerpt */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#A1A1AA] leading-relaxed">
              Diploma ICT student (Level 6) at <strong className="text-slate-900 dark:text-[#F4F4F5] font-semibold">The Kisumu National Polytechnic</strong> with hands-on industrial attachment at the <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Communications Authority of Kenya</strong> and <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Kenya Power (KPLC)</strong>. Skilled in Python, React, full-stack web, network troubleshooting, and ICT infrastructure.
            </p>

            {/* Contact Pills & Location */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#16161A] border border-slate-200/80 dark:border-[#25252A]">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{profile.location}</span>
              </div>
              
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#16161A] border border-slate-200/80 dark:border-[#25252A] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profile.phone}</span>
              </a>

              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#16161A] border border-slate-200/80 dark:border-[#25252A] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{profile.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                )}
              </button>
            </div>

            {/* Primary Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                id="hero-contact-cta"
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/25 transition-all"
              >
                <span>Get In Touch / Hire</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-print-cv-cta"
                onClick={handlePrintCV}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-sm shadow-xs transition-all active:scale-98"
              >
                <Printer className="w-4 h-4 text-slate-900" />
                <span>Print Official CV (PDF)</span>
              </button>

              <a
                id="hero-whatsapp-cta"
                href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hi Brighton, I came across your ICT Portfolio & CV and would like to connect.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-all active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                id="hero-terminal-cta"
                onClick={() => setViewMode('terminal')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#16161A] dark:hover:bg-[#25252A] text-slate-800 dark:text-[#F4F4F5] font-mono text-sm border border-slate-300 dark:border-[#25252A] shadow-2xs transition-all"
                title="Launch Interactive Terminal View"
              >
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>CLI Terminal</span>
              </button>
            </div>
          </div>

          {/* Executive Profile Card with Photo & Settings Trigger */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="rounded-3xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xl overflow-hidden group hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300">
              
              {/* Profile Image Frame or Initials Monogram */}
              <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Gradient vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="hidden w-full h-full bg-gradient-to-br from-indigo-700 via-indigo-900 to-slate-950 text-white flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-3xl mb-2 shadow-xl">
                    {getInitials(profile.name)}
                  </div>
                  <div className="text-sm font-semibold">{profile.name}</div>
                  <div className="text-xs text-indigo-200">Executive ICT Candidate Profile</div>
                </div>

                {/* Floating Status & Credentials Badges on Image */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Work
                  </span>
                </div>

                {/* Quick Edit Profile Button on Card Header */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={openProfileModal}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 hover:bg-indigo-600 backdrop-blur-md text-white text-[11px] font-semibold shadow-md transition-colors border border-white/20"
                    title="Change or remove profile photo & edit info"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Manage</span>
                  </button>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-bold text-base tracking-wide flex items-center gap-1.5 drop-shadow-md">
                    <span>{profile.name}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium drop-shadow-xs">
                    The Kisumu National Polytechnic • Adm: <span className="font-mono text-indigo-300">TKNP/B/9073</span>
                  </div>
                </div>
              </div>

              {/* Card Body with Key Verified Highlights */}
              <div className="p-5 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">
                    <span>Practical Industrial Exposure</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">100% Verified</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/70 dark:border-[#25252A]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-[#F4F4F5]">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>CA Kenya</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-[#A1A1AA] mt-0.5">
                        Telecom & Spectrum
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/70 dark:border-[#25252A]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-[#F4F4F5]">
                        <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Kenya Power</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-[#A1A1AA] mt-0.5">
                        Enterprise IT Support
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Stack Chips */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 dark:text-[#71717A] uppercase">
                    Core Technical Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'React', 'Node.js', 'Express', 'MySQL', 'Cisco LAN', 'Android Kotlin'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] text-[11px] font-medium border border-slate-200/50 dark:border-transparent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Link with Profile Settings Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-[#25252A] flex items-center justify-between text-xs">
                  <button
                    onClick={openProfileModal}
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-[#A1A1AA] hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change/Remove Photo</span>
                  </button>

                  <a
                    href="#about"
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    <span>Full Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Executive Dashboard Metrics & Quick Highlights Banner (Always fully visible) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-[#25252A] text-indigo-600 dark:text-indigo-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">Education Level</div>
              <div className="text-sm font-bold text-slate-900 dark:text-[#F4F4F5]">Diploma in ICT (Level 6)</div>
              <div className="text-[11px] text-slate-500 dark:text-[#A1A1AA]">The Kisumu National Poly</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#25252A] text-emerald-600 dark:text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">Industrial Attachment</div>
              <div className="text-sm font-bold text-slate-900 dark:text-[#F4F4F5]">CA Kenya & Kenya Power</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified Telecom & IT Support</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-[#25252A] text-violet-600 dark:text-violet-400 shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">Technical Scope</div>
              <div className="text-sm font-bold text-slate-900 dark:text-[#F4F4F5]">Full-Stack & Networking</div>
              <div className="text-[11px] text-slate-500 dark:text-[#A1A1AA]">Python, React, MySQL, Cisco</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-[#25252A] text-amber-600 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider">Hiring Readiness</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Available Immediately</div>
              <div className="text-[11px] text-slate-500 dark:text-[#A1A1AA]">Kisumu • Nairobi • Remote</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

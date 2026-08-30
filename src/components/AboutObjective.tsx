import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  Network, 
  Award, 
  Sparkles, 
  FileCheck2 
} from 'lucide-react';
import { educationData } from '../data/cvData';
import { useProfile } from '../context/ProfileContext';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const AboutObjective: React.FC = () => {
  const { profile, isPhotoVisible } = useProfile();

  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
    Code2: <Code2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
    Network: <Network className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-amber-500 dark:text-amber-400" />
  };

  const edu = educationData[0];

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  return (
    <section id="about" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Profile & Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
              Career Objective & Academic Background
            </h2>
          </div>
        </ScrollReveal>

        {/* Top Grid: Objective & Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Career Objective Box */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Professional Statement</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {profile.profileImage && isPhotoVisible ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover object-top ring-2 ring-indigo-500/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-indigo-500/30">
                      {getInitials(profile.name)}
                    </div>
                  )}
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 dark:text-[#F4F4F5]">{profile.name}</div>
                    <div className="text-[10px] text-slate-400 dark:text-[#71717A]">Diploma Candidate</div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-[#F4F4F5]">
                Career Objective
              </h3>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
                {profile.careerObjective}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#25252A] flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Coursework Completed July 31, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Transcripts & Reports Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Available Immediately
              </span>
            </div>
          </ScrollReveal>

          {/* Education Card */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 p-8 rounded-2xl bg-[#16161A] text-white shadow-xl flex flex-col justify-between border border-[#25252A] relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  {edu.level}
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Coursework Complete
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F4F4F5]">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-indigo-400 mt-1">
                  {edu.institution}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 dark:text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{edu.status}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#25252A] text-[#F4F4F5] text-xs border border-[#25252A]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#25252A] text-[11px] text-[#71717A] italic">
              {edu.notes}
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Pillars of Competence */}
        <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.summaryPillars?.map((pillar, idx) => (
            <StaggerItem key={idx}>
              <div className="p-6 h-full rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs hover:shadow-md hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#25252A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[pillar.icon] || <Sparkles className="w-6 h-6 text-indigo-500" />}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-[#F4F4F5] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

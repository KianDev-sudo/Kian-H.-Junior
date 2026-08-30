import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Users, 
  Trophy, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  BrainCircuit, 
  Clock, 
  Scale, 
  Compass 
} from 'lucide-react';
import { 
  certificationsData, 
  schoolActivitiesData, 
  softSkillsData 
} from '../data/cvData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const CertificationsAndActivities: React.FC = () => {
  const activityIcons: Record<string, React.ReactNode> = {
    Users: <Users className="w-5 h-5 text-indigo-500" />,
    Trophy: <Trophy className="w-5 h-5 text-amber-500" />,
    BookOpen: <BookOpen className="w-5 h-5 text-emerald-500" />,
    Award: <Award className="w-5 h-5 text-indigo-500" />
  };

  const softSkillIcons: Record<string, React.ReactNode> = {
    'Communication & Active Listening': <HeartHandshake className="w-5 h-5 text-indigo-500" />,
    'Teamwork & Collaboration': <Users className="w-5 h-5 text-indigo-500" />,
    'Problem-Solving & Critical Thinking': <BrainCircuit className="w-5 h-5 text-emerald-500" />,
    'Adaptability & Quick Learning': <Sparkles className="w-5 h-5 text-amber-500" />,
    'Time Management & Organization': <Clock className="w-5 h-5 text-rose-500" />,
    'Professional conduct, confidentiality, and adherence to institutional protocols': <Scale className="w-5 h-5 text-indigo-400" />
  };

  return (
    <section id="certifications" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* TOP SECTION: CERTIFICATIONS & CREDENTIALS */}
        <div className="space-y-8">
          <ScrollReveal direction="up" distance={20}>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Qualifications</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                Certifications & Online Learning
              </h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
                Accredited courses completed through Cisco Networking Academy, HP LIFE Global Learning, and institutional polytechnic curricula.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationsData.map((cert, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="p-6 h-full rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60">
                        {cert.badgeType}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500 dark:text-[#71717A]">
                        {cert.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-[#F4F4F5]">
                      {cert.title}
                    </h3>

                    <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {cert.issuer}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-[#A1A1AA] leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#25252A] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Credential Verified</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* MIDDLE SECTION: SCHOOL ACTIVITIES & LEADERSHIP */}
        <div className="space-y-8">
          <ScrollReveal direction="up" distance={20}>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Users className="w-3.5 h-3.5" />
                <span>Campus Leadership</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                School Activities & Involvement
              </h3>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-sm">
                Demonstrated commitment to the tech community, academic mentorship, and inter-polytechnic skills competitions at TKNP.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolActivitiesData.map((act, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="p-6 h-full rounded-2xl bg-slate-50/70 dark:bg-[#16161A] border border-slate-200/80 dark:border-[#25252A] flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-white dark:bg-[#25252A] text-slate-900 dark:text-[#F4F4F5] shadow-xs shrink-0 border border-slate-200/60 dark:border-[#25252A]">
                    {activityIcons[act.icon] || <Sparkles className="w-5 h-5 text-indigo-500" />}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-[#F4F4F5]">
                      {act.title}
                    </h4>
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {act.organization}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA] leading-relaxed pt-1">
                      {act.roleDescription}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* BOTTOM SECTION: SOFT SKILLS & PROFESSIONAL TRAITS */}
        <div className="space-y-8">
          <ScrollReveal direction="up" distance={20}>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Workplace Attributes</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                Soft Skills & Professional Competencies
              </h3>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkillsData.map((skill, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="p-5 h-full rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-[#25252A] text-indigo-600 dark:text-indigo-400">
                      {softSkillIcons[skill.name] || <Sparkles className="w-4 h-4" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A]">
                      {skill.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-[#F4F4F5]">
                    {skill.name}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-[#A1A1AA] leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { 
  UserCheck, 
  Phone, 
  MapPin, 
  Building2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { refereesData } from '../data/cvData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const RefereesSection: React.FC = () => {
  return (
    <section id="referees" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Academic & Institutional Referees</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
              Professional References
            </h2>
            <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
              Official academic and industrial liaison contacts available for background checks, recommendation verification, and appraisal confirmation.
            </p>
          </div>
        </ScrollReveal>

        {/* Referees Cards Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {refereesData.map((referee, idx) => (
            <StaggerItem key={idx}>
              <div
                className="p-8 h-full rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-[#F4F4F5]">
                        {referee.name}
                      </h3>
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {referee.title}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-[#25252A] text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA]">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{referee.institution}</span>
                    </div>

                    {referee.address && (
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{referee.address}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2.5 font-mono">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-[#F4F4F5]">{referee.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-[#25252A] flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-[#71717A]">The Kisumu National Polytechnic</span>
                  <a
                    href={`tel:${referee.phone.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-xs font-semibold text-slate-700 dark:text-[#F4F4F5] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Call Office</span>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

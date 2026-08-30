import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Radio, 
  Zap, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  Server 
} from 'lucide-react';
import { experienceData } from '../data/cvData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const ExperienceTimeline: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['ca-kenya', 'kenya-power']);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(experienceData.map(e => e.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  return (
    <section id="experience" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-3.5 h-3.5" />
                <span>Industrial Attachment Experience</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                Hands-On Industry Experience
              </h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
                Practical immersion inside national government regulatory bodies and large-scale corporate utility ICT departments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandedIds.length === experienceData.length ? collapseAll : expandAll}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#16161A] text-xs font-semibold text-slate-700 dark:text-[#F4F4F5] border border-slate-200 dark:border-[#25252A] hover:bg-slate-200 dark:hover:bg-[#25252A] transition-colors cursor-pointer"
              >
                {expandedIds.length === experienceData.length ? 'Collapse Views' : 'Show All Details'}
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60">
                <span>2 Attachments Verified</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Stack */}
        <StaggerContainer staggerDelay={0.12} className="space-y-6">
          {experienceData.map((exp, index) => {
            const isExpanded = expandedIds.includes(exp.id);
            const isCA = exp.id === 'ca-kenya';

            return (
              <StaggerItem key={exp.id} distance={24}>
                <div
                  className={`rounded-2xl border transition-all duration-300 bg-white dark:bg-[#16161A] ${
                    isExpanded
                      ? 'border-indigo-500/50 dark:border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-[#25252A] shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Main Header Card */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Organization Icon / Logo Badge */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-xs ${
                          isCA
                            ? 'bg-indigo-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {isCA ? <Radio className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F4F4F5]">
                            {exp.role}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                            {exp.badge}
                          </span>
                        </div>

                        <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                          {exp.organization}
                        </div>

                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#A1A1AA]">
                          {exp.department}
                        </div>
                      </div>
                    </div>

                    {/* Meta Details & Toggle Icon */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-[#25252A] text-xs sm:text-sm text-slate-500 dark:text-[#A1A1AA]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-[#F4F4F5]">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <button
                        className={`p-2 rounded-xl border border-slate-200 dark:border-[#25252A] bg-slate-50 dark:bg-[#25252A] text-slate-600 dark:text-[#F4F4F5] transition-transform cursor-pointer ${
                          isExpanded ? 'rotate-180 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                        aria-label="Toggle details"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details Body */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100 dark:border-[#25252A] space-y-6">
                      {/* Key Highlights Bullet Points */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#71717A] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          <span>Key Responsibilities & Deliverables</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {exp.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-[#A1A1AA] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scope & Impact Deep Dive */}
                      {exp.expandedDetails && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#1C1C22] border border-slate-200/80 dark:border-[#25252A] text-xs">
                          <div className="space-y-1">
                            <span className="font-semibold text-slate-900 dark:text-[#F4F4F5] uppercase tracking-wider text-[11px]">Scope of Operations:</span>
                            <p className="text-slate-600 dark:text-[#A1A1AA]">{exp.expandedDetails.scope}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-semibold text-slate-900 dark:text-[#F4F4F5] uppercase tracking-wider text-[11px]">Organizational Impact:</span>
                            <p className="text-slate-600 dark:text-[#A1A1AA]">{exp.expandedDetails.impact}</p>
                          </div>
                        </div>
                      )}

                      {/* Technologies & Protocols Tagged */}
                      <div className="pt-2">
                        <h4 className="text-xs font-semibold text-slate-400 dark:text-[#71717A] uppercase tracking-wider mb-2">
                          Core Systems & Tools Leveraged:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] border border-slate-200/80 dark:border-[#25252A]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  FolderGit2, 
  Play, 
  Layers, 
  Code2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  HardDrive 
} from 'lucide-react';
import { projectsData } from '../data/cvData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Desktop & Systems', 'Networking & Infrastructure', 'Hardware & Maintenance', 'Full-Stack & Web', 'Mobile'];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Technical Demonstrations & Labs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                Academic & Personal Projects
              </h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
                Hands-on implementations in Python, MySQL, Cisco Packet Tracer LAN topologies, hardware diagnosis, and full-stack web applications.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#16161A] text-xs font-semibold text-slate-600 dark:text-[#A1A1AA] border border-slate-200 dark:border-[#25252A]">
              <span>{projectsData.length} Featured Systems</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal direction="up" delay={0.08}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`h-9 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center border select-none cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#16161A] text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-[#F4F4F5] border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#25252A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const isFeaturedLab = proj.demoType !== 'general';

            return (
              <StaggerItem key={proj.id}>
                <div
                  className="rounded-2xl h-full bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/60">
                        {proj.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-[#71717A]">
                        {proj.type}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-[#F4F4F5] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA] leading-relaxed line-clamp-3">
                        {proj.summary}
                      </p>
                    </div>

                    {/* Highlights checklist (2 items preview) */}
                    <div className="space-y-1.5 pt-1">
                      {proj.highlights.slice(0, 2).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-[#A1A1AA]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-[#25252A] text-slate-700 dark:text-[#F4F4F5] border border-slate-200/60 dark:border-[#25252A]"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 dark:text-[#71717A]">
                          +{proj.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-4 border-t border-slate-100 dark:border-[#25252A] bg-slate-50/50 dark:bg-[#16161A] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inspect Details & Code</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {isFeaturedLab && (
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>

      {/* Deep-Dive Project Details & Simulator Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  Globe, 
  Database, 
  Network, 
  Smartphone, 
  Cpu, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  Sparkles, 
  Zap 
} from 'lucide-react';
import { skillCategories } from '../data/cvData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming Languages': <Terminal className="w-4 h-4" />,
    'Web & Backend Development': <Globe className="w-4 h-4" />,
    'Databases & Data Management': <Database className="w-4 h-4" />,
    'Networking & IT Infrastructure': <Network className="w-4 h-4" />,
    'Mobile Development': <Smartphone className="w-4 h-4" />,
    'Tools, Platforms & OS': <Cpu className="w-4 h-4" />,
  };

  const categories = ['All', ...skillCategories.map((c) => c.category)];

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => selectedCategory === 'All' || cat.category === selectedCategory)
      .map((cat) => {
        const filteredSkills = cat.skills.filter((skill) => {
          const matchName = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchTags = skill.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchName || matchTags;
        });
        return {
          ...cat,
          skills: filteredSkills,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalSkillsCount = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <section id="skills" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Technical Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                Skills & Technical Matrix
              </h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
                A comprehensive breakdown of programming languages, network cabling standards, full-stack technologies, and database systems.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-[#16161A] border border-indigo-200 dark:border-[#25252A] text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <span>{totalSkillsCount} Skills Cataloged</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal direction="up" delay={0.08}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-2 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none px-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-9 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 border select-none cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-[#111114] border-slate-200/80 dark:border-[#25252A] text-slate-600 dark:text-[#A1A1AA] hover:text-slate-900 dark:hover:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A]'
                    }`}
                  >
                    {cat !== 'All' && categoryIcons[cat]}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px] px-1 lg:px-0">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#71717A] absolute left-4 lg:left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter skills (e.g. Python, MySQL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-8 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] placeholder:text-slate-400 dark:placeholder:text-[#71717A] focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-[#F4F4F5] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Skill Category Cards Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-[#16161A] border border-dashed border-slate-300 dark:border-[#25252A] space-y-3">
            <Search className="w-8 h-8 text-slate-400 dark:text-[#71717A] mx-auto" />
            <div className="text-base font-bold text-slate-700 dark:text-[#F4F4F5]">No matching skills found</div>
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">Try changing your search query or switching category tabs.</p>
          </div>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <StaggerItem key={category.category}>
                <div className="p-6 h-full rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-[#25252A]">
                      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-[#25252A] text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-[#25252A]">
                        {categoryIcons[category.category] || <Sparkles className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-[#F4F4F5] text-base">
                          {category.category}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-[#A1A1AA] line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skill Items List */}
                    <div className="space-y-4 pt-1">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-800 dark:text-[#F4F4F5] font-medium">
                              {skill.name}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#25252A] text-slate-600 dark:text-[#A1A1AA]">
                              {skill.level}
                            </span>
                          </div>

                          {/* Progress Indicator Bar */}
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-[#25252A] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                              style={{ width: `${skill.percentage}%` }}
                            />
                          </div>

                          {/* Tag Pills */}
                          {skill.tags && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-1.5 py-0.5 text-[10px] rounded bg-slate-50 dark:bg-[#25252A] text-slate-500 dark:text-[#A1A1AA] border border-slate-200/50 dark:border-[#25252A]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>
    </section>
  );
};

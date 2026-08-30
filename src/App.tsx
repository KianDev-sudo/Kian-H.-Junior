/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutObjective } from './components/AboutObjective';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CertificationsAndActivities } from './components/CertificationsAndActivities';
import { RefereesSection } from './components/RefereesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrintableCV } from './components/PrintableCV';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { BottomNavDock } from './components/BottomNavDock';
import { ViewMode } from './types';

export function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isProfileModalOpen, closeProfileModal } = useProfile();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0D0D0F] dark:text-[#F4F4F5] transition-colors duration-300 relative pb-16 sm:pb-20">
      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setViewMode={setViewMode}
      />

      {/* Profile Management & Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      {/* Main Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* View Switcher Handler */}
      {viewMode === 'portfolio' && (
        <main className="flex-1">
          <Hero setViewMode={setViewMode} />
          <AboutObjective />
          <ExperienceTimeline />
          <SkillsMatrix />
          <ProjectsShowcase />
          <CertificationsAndActivities />
          <RefereesSection />
          <ContactSection />
        </main>
      )}

      {viewMode === 'cv-preview' && (
        <main className="flex-1">
          <PrintableCV onBackToPortfolio={() => setViewMode('portfolio')} />
        </main>
      )}

      {viewMode === 'terminal' && (
        <main className="flex-1">
          <InteractiveTerminal
            onBackToPortfolio={() => setViewMode('portfolio')}
            setViewMode={setViewMode}
          />
        </main>
      )}

      {/* Footer */}
      {viewMode !== 'terminal' && <Footer setViewMode={setViewMode} />}

      {/* Bottom Floating Navigation Dock / Tabs */}
      <BottomNavDock
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </ThemeProvider>
  );
}


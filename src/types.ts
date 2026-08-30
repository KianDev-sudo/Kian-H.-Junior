export type ThemeMode = 'light' | 'dark' | 'system';
export type ViewMode = 'portfolio' | 'cv-preview' | 'terminal';

export interface ProfileData {
  name: string;
  tagline: string;
  roleTitles: string[];
  location: string;
  phone: string;
  email: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  status: string;
  statusDescription: string;
  careerObjective: string;
  profileImage?: string;
  summaryPillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface EducationItem {
  degree: string;
  level: string;
  institution: string;
  location: string;
  admissionNo?: string;
  period: string;
  expectedGraduation: string;
  status: string;
  coursework: string[];
  notes: string;
}

export interface AttachmentExperience {
  id: string;
  role: string;
  organization: string;
  department: string;
  location: string;
  period: string;
  badge: string;
  highlights: string[];
  technologies: string[];
  expandedDetails?: {
    scope: string;
    impact: string;
    keyLearnings: string[];
  };
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar' | 'Fundamental';
    percentage: number;
    tags?: string[];
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full-Stack & Web' | 'Desktop & Systems' | 'Networking & Infrastructure' | 'Hardware & Maintenance' | 'Mobile';
  summary: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  type: 'Academic' | 'Personal' | 'Industrial Attachment';
  demoType: 'crud-simulator' | 'network-topology' | 'hardware-diagnostic' | 'code-preview' | 'general';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  metrics?: { label: string; value: string }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  badgeType: string;
  description: string;
  verified: boolean;
}

export interface SchoolActivity {
  title: string;
  organization: string;
  roleDescription: string;
  icon: string;
}

export interface SoftSkillItem {
  name: string;
  description: string;
  category: string;
}

export interface RefereeItem {
  name: string;
  title: string;
  institution: string;
  department?: string;
  address?: string;
  phone: string;
  email?: string;
}

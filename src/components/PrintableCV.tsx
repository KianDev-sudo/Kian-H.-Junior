import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  Download,
  Sliders
} from 'lucide-react';
import { 
  educationData, 
  experienceData, 
  skillCategories, 
  projectsData, 
  certificationsData, 
  schoolActivitiesData, 
  softSkillsData, 
  refereesData 
} from '../data/cvData';
import { useProfile } from '../context/ProfileContext';
import confetti from 'canvas-confetti';

interface PrintableCVProps {
  onBackToPortfolio: () => void;
}

export const PrintableCV: React.FC<PrintableCVProps> = ({ onBackToPortfolio }) => {
  const { profile, isPhotoVisible, openProfileModal } = useProfile();

  const handlePrint = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1 }
    });
    window.print();
  };

  const edu = educationData[0];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-6 sm:py-10 px-4 sm:px-6 transition-colors">
      
      {/* Non-printed Top Action Control Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm no-print">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Interactive Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={openProfileModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            <span>Edit Profile Data / Photo</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container (Styled like a formal CV document) */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 shadow-2xl p-8 sm:p-14 rounded-xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-full">
        
        {/* CV HEADER */}
        <header className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 uppercase">
              {profile.name}
            </h1>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              ICT Student | Full-Stack Developer | IT Support & Networking
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
              <span>{profile.location}</span>
              <span>•</span>
              <span>Phone: {profile.phone}</span>
              <span>•</span>
              <span>Email: {profile.email}</span>
            </div>
          </div>

          {profile.profileImage && isPhotoVisible && (
            <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-md overflow-hidden border-2 border-slate-700 shrink-0 shadow-xs">
              <img
                src={profile.profileImage}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </header>

        {/* SECTION 1: CAREER OBJECTIVE */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            CAREER OBJECTIVE
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 text-justify">
            {profile.careerObjective}
          </p>
        </section>

        {/* SECTION 2: EDUCATION */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            EDUCATION
          </h2>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between items-baseline font-bold text-slate-900">
              <span>{edu.degree}</span>
              <span className="font-mono">{edu.period}</span>
            </div>
            <div className="text-slate-700 italic">
              {edu.level}
            </div>
            <div className="text-slate-800 font-medium">
              {edu.institution}, {edu.location}
            </div>
            <div className="text-slate-700 pt-0.5">
              <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
            </div>
            <ul className="list-disc list-inside text-slate-800 pt-1 text-[11px]">
              <li>{edu.status} (Coursework completed July 31, 2026; expected 2027). Academic transcripts and attachment reports available on request.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: INDUSTRIAL ATTACHMENT EXPERIENCE */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            INDUSTRIAL ATTACHMENT EXPERIENCE
          </h2>
          
          <div className="space-y-4 text-xs">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="font-bold text-slate-900">
                  <span>{exp.role}</span> | <span className="italic font-normal">{exp.organization}, {exp.department}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 text-[11px] leading-relaxed pt-0.5">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: TECHNICAL SKILLS */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-1.5 text-xs text-slate-800">
            <div>
              <strong>• Programming Languages:</strong> Python, Java, C/C++, HTML/CSS, JavaScript
            </div>
            <div>
              <strong>• Web Development:</strong> HTML5, CSS3, JavaScript, PHP (basics), React, Node.js, Express
            </div>
            <div>
              <strong>• Database Management:</strong> MySQL, PostgreSQL, Microsoft Access
            </div>
            <div>
              <strong>• Networking & ICT Support:</strong> TCP/IP, LAN/WAN setup, network cabling, hardware troubleshooting, ICT maintenance & repair
            </div>
            <div>
              <strong>• Mobile Development:</strong> Android (Kotlin, Java, Room, Retrofit)
            </div>
            <div>
              <strong>• Tools & Applications:</strong> Microsoft Office Suite (Word, Excel, PowerPoint, Access), Windows OS, Linux (basics), Git/GitHub
            </div>
          </div>
        </section>

        {/* SECTION 5: ACADEMIC & PERSONAL PROJECTS */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            ACADEMIC & PERSONAL PROJECTS
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-2 text-xs text-slate-800 leading-relaxed">
            {projectsData.map((project) => (
              <li key={project.id}>
                <strong>{project.title} ({project.technologies.join(', ')})</strong> — {project.fullDescription || project.summary}
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 6: CERTIFICATIONS & ONLINE LEARNING */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            CERTIFICATIONS & ONLINE LEARNING
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800">
            {certificationsData.map((cert, idx) => (
              <li key={idx}>
                <strong>{cert.title}</strong> — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 7: SCHOOL ACTIVITIES & INVOLVEMENT */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            SCHOOL ACTIVITIES & INVOLVEMENT
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800">
            {schoolActivitiesData.map((act, idx) => (
              <li key={idx}><strong>{act.title}:</strong> {act.roleDescription} ({act.organization})</li>
            ))}
          </ul>
        </section>

        {/* SECTION 8: SOFT SKILLS */}
        <section className="pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            SOFT SKILLS
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-800">
            {softSkillsData.map((skill, idx) => (
              <li key={idx}><strong>{skill.name}:</strong> {skill.description}</li>
            ))}
          </ul>
        </section>

        {/* SECTION 9: REFEREES */}
        <section className="pt-6 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-1 mb-2.5">
            REFEREES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-800">
            {refereesData.map((ref, idx) => (
              <div key={idx}>
                <div className="font-bold text-slate-900">{ref.name}</div>
                <div>{ref.title}</div>
                <div>{ref.institution}</div>
                {ref.address && <div>{ref.address}</div>}
                <div>Tel: {ref.phone}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

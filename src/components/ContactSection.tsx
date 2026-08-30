import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  Calendar, 
  Download,
  Sliders,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const { profile, isPhotoVisible, openProfileModal } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Job / Internship Opportunity Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'fallback' | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  const getMailtoUrl = () => {
    return `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Hi ${profile.name.split(' ')[0]},\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
    )}`;
  };

  const getWebmailGmailUrl = () => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      profile.email
    )}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Hi ${profile.name.split(' ')[0]},\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
    )}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Direct Formsubmit AJAX endpoint to deliver directly to Brighton's inbox without mail client
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Inquiry] ${formData.subject}`,
          message: formData.message,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitted(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Fallback to opening mail link
        setSubmitStatus('fallback');
        setSubmitted(true);
        window.location.href = getMailtoUrl();
      }
    } catch {
      // Network/AdBlock fallback
      setSubmitStatus('fallback');
      setSubmitted(true);
      window.location.href = getMailtoUrl();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:The Kisumu National Polytechnic
TITLE:ICT Student | Full-Stack Developer | IT Support & Networking
TEL;TYPE=CELL:${profile.phone}
EMAIL:${profile.email}
ADR;TYPE=WORK:;;${profile.location};;;Kenya
NOTE:Available for immediate ICT internship and full-stack developer roles.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    confetti({ particleCount: 20 });
  };

  return (
    <section id="contact" className="py-16 border-t border-slate-200 dark:border-[#25252A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Mail className="w-3.5 h-3.5" />
              <span>Let's Connect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
              Get in Touch / Request Interview
            </h2>
            <p className="text-slate-600 dark:text-[#A1A1AA] text-sm sm:text-base">
              Available immediately for ICT internships, entry-level full-stack development, and IT support & network engineering roles in Kisumu, Nairobi, or remote.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Fast Actions */}
          <ScrollReveal direction="up" delay={0.06} className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#16161A] border border-slate-200 dark:border-[#25252A] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#25252A]">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-indigo-500/30 shrink-0 bg-slate-900 flex items-center justify-center">
                    {profile.profileImage && isPhotoVisible ? (
                      <img
                        src={profile.profileImage}
                        alt={profile.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                        {getInitials(profile.name)}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#16161A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-[#F4F4F5]">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      Available for Interviews & Roles
                    </p>
                  </div>
                </div>

                <button
                  onClick={openProfileModal}
                  className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors"
                  title="Edit Profile Information"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/80 dark:border-[#25252A]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-[#25252A] text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-slate-400 dark:text-[#71717A] uppercase font-semibold">Email</div>
                      <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-[#F4F4F5] truncate">
                        {profile.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/80 dark:border-[#25252A]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-[#25252A] text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 dark:text-[#71717A] uppercase font-semibold">Phone</div>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-xs sm:text-sm font-medium text-slate-900 dark:text-[#F4F4F5] hover:underline"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Box */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/80 dark:border-[#25252A]">
                  <div className="p-2 rounded-lg bg-rose-100 dark:bg-[#25252A] text-rose-600 dark:text-rose-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 dark:text-[#71717A] uppercase font-semibold">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-[#F4F4F5]">
                      {profile.location} (Open to Relocation / Hybrid)
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Stack */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={`https://wa.me/${profile.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hello Brighton, I would like to discuss an opportunity.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>

                <button
                  onClick={handleDownloadVCard}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-slate-700 dark:text-[#F4F4F5] font-semibold text-xs transition-all border border-slate-200 dark:border-[#25252A]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Contact Card (.vcf)</span>
                </button>
              </div>
            </div>

            {/* Working Hours / Availability Notice */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-[#16161A] border border-indigo-200/80 dark:border-[#25252A] text-xs text-slate-700 dark:text-[#A1A1AA] space-y-1">
              <div className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Response Time SLA</span>
              </div>
              <p className="text-slate-600 dark:text-[#A1A1AA]">
                Typically replies to emails and phone inquiries within 1–2 hours during business hours (EAT / UTC+3).
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Message Dispatcher */}
          <ScrollReveal direction="up" delay={0.12} className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#141418] border border-slate-200/90 dark:border-[#232328] shadow-sm overflow-hidden flex flex-col justify-between">
              {/* Header with status badge */}
            <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-[#202025] bg-slate-50/50 dark:bg-[#18181D]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F4F4F5] tracking-tight">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mt-0.5">
                    Your inquiry is delivered instantly to Brighton's primary mailbox.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[11px]">{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1">
              {submitted ? (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl bg-slate-50/80 dark:bg-[#0E0E12] border border-slate-200/70 dark:border-[#232328] transition-all">
                  <div className={`w-14 h-14 rounded-2xl ${submitStatus === 'success' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'} flex items-center justify-center mb-4 shadow-sm`}>
                    {submitStatus === 'success' ? <Check className="w-7 h-7" /> : <Send className="w-7 h-7" />}
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-2">
                    {submitStatus === 'success' ? 'Delivered Directly' : 'Draft Prepared'}
                  </span>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-[#F4F4F5] mb-1.5">
                    {submitStatus === 'success' ? 'Message Sent Successfully!' : 'Message Ready to Send'}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA] max-w-md mx-auto mb-6 leading-relaxed">
                    {submitStatus === 'success'
                      ? `Thank you! Your message has been sent to ${profile.email}. Brighton typically responds within 1–2 hours.`
                      : `Your message has been pre-formatted for ${profile.email}. Click below to confirm sending from your email provider.`}
                  </p>

                  {/* Sent Data Summary Box */}
                  <div className="w-full max-w-md bg-white dark:bg-[#18181D] rounded-xl p-3.5 border border-slate-200/80 dark:border-[#25252A] text-left text-xs mb-6 space-y-1.5">
                    <div className="text-slate-500 dark:text-[#71717A] text-[11px] uppercase font-semibold">Subject</div>
                    <div className="font-medium text-slate-900 dark:text-[#F4F4F5] truncate">{formData.subject || 'Opportunity Inquiry'}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 w-full max-w-md">
                    <a
                      href={getWebmailGmailUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href={getMailtoUrl()}
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Default Email App</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: 'Job / Internship Opportunity Inquiry',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-slate-700 dark:text-[#F4F4F5] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#E4E4E7] mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins (HR Director)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#0E0E12] border border-slate-200 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#E4E4E7] mb-1.5">
                        Your Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#0E0E12] border border-slate-200 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-[#E4E4E7] mb-1.5">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#0E0E12] border border-slate-200 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#E4E4E7]">
                        Message Details <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 dark:text-[#71717A]">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      required
                      placeholder={`Hello ${profile.name.split(' ')[0]}, we have an ICT & Full-Stack engineering opportunity in our team and would love to connect...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#0E0E12] border border-slate-200 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
                    >
                      <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                      <span>{isSubmitting ? 'Sending to Inbox...' : 'Send Message Directly'}</span>
                    </button>

                    <a
                      href={getWebmailGmailUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1F1F24] dark:hover:bg-[#282830] text-slate-700 dark:text-[#F4F4F5] font-semibold text-xs transition-colors border border-slate-200/80 dark:border-[#2A2A30]"
                    >
                      <Mail className="w-3.5 h-3.5 text-rose-500" />
                      <span>Compose in Gmail</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Subtle bottom guarantee */}
            <div className="px-6 py-3 border-t border-slate-100 dark:border-[#1E1E23] bg-slate-50/30 dark:bg-[#111114] text-[11px] text-slate-500 dark:text-[#71717A] flex items-center justify-between">
              <span>Encrypted transmission directly to {profile.email}</span>
              <span className="hidden sm:inline">Usually replies within 1–2 hours</span>
            </div>
          </div>
        </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

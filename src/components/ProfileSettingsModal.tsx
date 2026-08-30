import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  User, 
  Camera, 
  Upload, 
  Trash2, 
  RotateCcw, 
  Check, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Briefcase, 
  ShieldCheck,
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    profile,
    isPhotoVisible,
    isCustomized,
    updateProfile,
    updateProfilePhoto,
    togglePhotoVisible,
    setPhotoVisible,
    resetProfile,
    defaultPhotoUrl
  } = useProfile();

  const [activeTab, setActiveTab] = useState<'photo' | 'info' | 'objective'>('photo');
  const [formData, setFormData] = useState({
    name: profile.name,
    tagline: profile.tagline,
    phone: profile.phone,
    email: profile.email,
    whatsapp: profile.whatsapp,
    location: profile.location,
    status: profile.status,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    careerObjective: profile.careerObjective,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync formData when profile changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: profile.name,
        tagline: profile.tagline,
        phone: profile.phone,
        email: profile.email,
        whatsapp: profile.whatsapp,
        location: profile.location,
        status: profile.status,
        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        careerObjective: profile.careerObjective,
      });
      setUploadError(null);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  // Process image file and downscale if large to fit localStorage cleanly
  const processImageFile = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // Downscale image via canvas to maintain fast load times and clean localStorage storage
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          updateProfilePhoto(compressedDataUrl);
          triggerSaveToast();
        } else {
          updateProfilePhoto(result);
          triggerSaveToast();
        }
      };
      img.src = result;
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const triggerSaveToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    triggerSaveToast();
  };

  const handleRemovePhoto = () => {
    updateProfilePhoto(null);
    setPhotoVisible(false);
    triggerSaveToast();
  };

  const handleRestoreDefaultPhoto = () => {
    updateProfilePhoto(defaultPhotoUrl);
    setPhotoVisible(true);
    triggerSaveToast();
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all profile info, photo, and settings back to original defaults?')) {
      resetProfile();
      triggerSaveToast();
    }
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase() || 'BO';
  };

  const isCurrentPhotoDefault = profile.profileImage === defaultPhotoUrl;
  const hasCustomPhoto = profile.profileImage && profile.profileImage !== defaultPhotoUrl;

  const quickStatusPresets = [
    'Available for Immediate Employment',
    'Open to Attachment & Full-Time Roles',
    'Seeking Internship / Graduate Roles',
    'Available for Freelance & Projects',
    'Currently Engaged in ICT Studies'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto no-print">
      <div 
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#16161A] rounded-2xl border border-slate-200 dark:border-[#25252A] shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-[#25252A] flex items-center justify-between gap-4 bg-slate-50/70 dark:bg-[#0D0D0F]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F4F4F5]">
                  Profile Management & Settings
                </h2>
                {isCustomized && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                    Customized
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">
                Customize your profile picture, contact credentials, and portfolio visibility.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 dark:border-[#25252A] bg-white dark:bg-[#16161A] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('photo')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'photo'
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Profile Photo & Avatar</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Personal & Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab('objective')}
            className={`py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'objective'
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Career Objective</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: PHOTO & AVATAR MANAGEMENT */}
          {activeTab === 'photo' && (
            <div className="space-y-6">
              
              {/* Photo Preview & Visibility Toggle Banner */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-200/80 dark:border-[#25252A] flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Live Avatar Preview Container */}
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-slate-900 shadow-lg flex items-center justify-center">
                    {profile.profileImage && isPhotoVisible ? (
                      <img
                        src={profile.profileImage}
                        alt={profile.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white flex flex-col items-center justify-center font-bold">
                        <span className="text-3xl tracking-wider">{getInitials(profile.name)}</span>
                        <span className="text-[10px] text-indigo-200 font-normal mt-1">Initials Avatar</span>
                      </div>
                    )}
                  </div>

                  {/* Status beacon badge */}
                  <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ring-2 ring-white dark:ring-[#16161A] ${
                    isPhotoVisible ? 'bg-emerald-500' : 'bg-slate-400'
                  }`} />
                </div>

                {/* Photo Info & Visibility Control */}
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-[#F4F4F5]">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">
                        {profile.profileImage && isPhotoVisible 
                          ? (hasCustomPhoto ? 'Custom Uploaded Photo Active' : 'Default Enhanced Studio Portrait') 
                          : 'Initials Monogram Mode (Photo Hidden / Removed)'}
                      </p>
                    </div>

                    {/* Visibility Pill */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      isPhotoVisible
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                        : 'bg-slate-200 dark:bg-[#25252A] text-slate-700 dark:text-[#A1A1AA]'
                    }`}>
                      {isPhotoVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isPhotoVisible ? 'Photo Visible on Web & CV' : 'Photo Hidden'}</span>
                    </span>
                  </div>

                  {/* Visibility Switch Button */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={togglePhotoVisible}
                      className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#16161A] border border-slate-300 dark:border-[#25252A] text-xs font-semibold text-slate-700 dark:text-[#F4F4F5] hover:bg-slate-100 dark:hover:bg-[#25252A] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      {isPhotoVisible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                          <span>Hide Photo (Use Monogram)</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Show Photo on Site & CV</span>
                        </>
                      )}
                    </button>

                    {profile.profileImage && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Photo</span>
                      </button>
                    )}

                    {!isCurrentPhotoDefault && (
                      <button
                        type="button"
                        onClick={handleRestoreDefaultPhoto}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950/70 transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore Studio Shot</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Upload Dropzone */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#71717A]">
                  Upload New Photo from Device
                </label>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-300 dark:border-[#25252A] hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-[#0D0D0F]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-[#F4F4F5]">
                    Click to browse or drag & drop a new profile picture here
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mt-1">
                    Supports JPG, PNG, or WEBP (Max 8MB). Automatically cropped and optimized for portfolio and CV printing.
                  </p>
                </div>

                {uploadError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Photo Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#71717A]">
                  Quick Avatar Style Presets
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Preset 1: Studio Shot */}
                  <button
                    type="button"
                    onClick={() => {
                      updateProfilePhoto(defaultPhotoUrl);
                      setPhotoVisible(true);
                      triggerSaveToast();
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isCurrentPhotoDefault && isPhotoVisible
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#0D0D0F]'
                    }`}
                  >
                    <img
                      src={defaultPhotoUrl}
                      alt="Studio Portrait"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover object-top shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F4F4F5] truncate">
                        Studio Portrait
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-[#A1A1AA]">
                        Executive Navy Shirt
                      </div>
                    </div>
                  </button>

                  {/* Preset 2: Initials Monogram */}
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoVisible(false);
                      triggerSaveToast();
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      !isPhotoVisible
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#0D0D0F]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {getInitials(profile.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F4F4F5] truncate">
                        Initials Monogram
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-[#A1A1AA]">
                        Typographic Icon
                      </div>
                    </div>
                  </button>

                  {/* Preset 3: Custom Upload Slot */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      hasCustomPhoto && isPhotoVisible
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-[#25252A] hover:bg-slate-50 dark:hover:bg-[#0D0D0F]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#25252A] text-slate-500 flex items-center justify-center shrink-0">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F4F4F5] truncate">
                        {hasCustomPhoto ? 'Custom Upload' : 'Upload Custom'}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-[#A1A1AA]">
                        From local files
                      </div>
                    </div>
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PERSONAL & CONTACT INFO */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA]">
                    Full Official Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                {/* Primary Tagline / Subtitle */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA]">
                    Primary Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA] flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-indigo-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA] flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-indigo-500" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA] flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-emerald-500" />
                    <span>WhatsApp Direct URL / Phone</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    <span>Primary Location</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

              </div>

              {/* Status Badge Preset */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Availability Status Banner</span>
                </label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickStatusPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleInputChange('status', preset)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-100 hover:bg-slate-200 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-slate-700 dark:text-[#A1A1AA] transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-[#25252A]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA]">
                    GitHub Profile Link
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA]">
                    LinkedIn Profile Link
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Info Changes</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: CAREER OBJECTIVE */}
          {activeTab === 'objective' && (
            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-[#A1A1AA]">
                    Career Objective & Professional Statement
                  </label>
                  <span className="text-[11px] text-slate-400">Appears in Hero, About, and Printable CV</span>
                </div>
                <textarea
                  rows={6}
                  value={formData.careerObjective}
                  onChange={(e) => handleInputChange('careerObjective', e.target.value)}
                  className="w-full p-4 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#0D0D0F] border border-slate-300 dark:border-[#25252A] text-slate-900 dark:text-[#F4F4F5] focus:border-indigo-500 focus:outline-hidden leading-relaxed"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Career Statement</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-[#25252A] bg-slate-50/70 dark:bg-[#0D0D0F]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <button
            type="button"
            onClick={handleResetAll}
            className="text-slate-500 hover:text-rose-600 dark:text-[#71717A] dark:hover:text-rose-400 flex items-center gap-1 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Profile to Original Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            {showSavedToast && (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                <Check className="w-4 h-4" />
                <span>Changes saved!</span>
              </span>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-[#25252A] dark:hover:bg-[#2F2F36] text-slate-800 dark:text-[#F4F4F5] font-semibold"
            >
              Done & Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

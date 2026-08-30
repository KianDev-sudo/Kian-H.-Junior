import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileData } from '../types';
import { profileData as defaultProfileData } from '../data/cvData';
import defaultPhoto from '../assets/images/brighton_profile_photo_1788092810612.jpg';

interface ProfileContextType {
  profile: ProfileData;
  isPhotoVisible: boolean;
  isCustomized: boolean;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  updateProfile: (updated: Partial<ProfileData>) => void;
  updateProfilePhoto: (photoUrl: string | null) => void;
  togglePhotoVisible: () => void;
  setPhotoVisible: (visible: boolean) => void;
  resetProfile: () => void;
  defaultPhotoUrl: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY_PROFILE = 'app-user-profile-data';
const STORAGE_KEY_PHOTO_VISIBLE = 'app-user-photo-visible';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
        if (saved) {
          const parsed = JSON.parse(saved);
          const email = (parsed.email === 'kianhjunior@gmail.com' || !parsed.email) 
            ? 'brightonomondiumira@gmail.com' 
            : parsed.email;
          return {
            ...defaultProfileData,
            ...parsed,
            email,
            profileImage: parsed.profileImage !== undefined ? parsed.profileImage : defaultPhoto,
          };
        }
      } catch (err) {
        console.error('Error loading profile from localStorage:', err);
      }
    }
    return {
      ...defaultProfileData,
      profileImage: defaultPhoto,
    };
  });

  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTO_VISIBLE);
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return true;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Check if profile is different from default
  const isCustomized = Boolean(
    typeof window !== 'undefined' &&
    (localStorage.getItem(STORAGE_KEY_PROFILE) !== null ||
     localStorage.getItem(STORAGE_KEY_PHOTO_VISIBLE) !== null)
  );

  const saveProfileToStorage = (updatedProfile: ProfileData) => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn('Could not save profile to localStorage (storage quota may be exceeded if photo is too large):', e);
    }
  };

  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveProfileToStorage(next);
      return next;
    });
  };

  const updateProfilePhoto = (photoUrl: string | null) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        profileImage: photoUrl || undefined,
      };
      saveProfileToStorage(next);
      return next;
    });
    if (photoUrl && !isPhotoVisible) {
      setIsPhotoVisible(true);
      localStorage.setItem(STORAGE_KEY_PHOTO_VISIBLE, 'true');
    }
  };

  const togglePhotoVisible = () => {
    setIsPhotoVisible((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_PHOTO_VISIBLE, String(next));
      return next;
    });
  };

  const setPhotoVisible = (visible: boolean) => {
    setIsPhotoVisible(visible);
    localStorage.setItem(STORAGE_KEY_PHOTO_VISIBLE, String(visible));
  };

  const resetProfile = () => {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_PHOTO_VISIBLE);
    setProfile({
      ...defaultProfileData,
      profileImage: defaultPhoto,
    });
    setIsPhotoVisible(true);
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isPhotoVisible,
        isCustomized,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        updateProfile,
        updateProfilePhoto,
        togglePhotoVisible,
        setPhotoVisible,
        resetProfile,
        defaultPhotoUrl: defaultPhoto,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load language from localStorage on component mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') || 'EN';
      setLanguage(savedLanguage);
      setIsRTL(savedLanguage === 'AR');
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'AR');
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage.toLowerCase();
  };

  const value = {
    language,
    isRTL,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 
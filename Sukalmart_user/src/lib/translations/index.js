import { en } from './en';
import { ar } from './ar';

export const translations = {
  EN: en,
  AR: ar,
};

export const t = (key, language = 'EN') => {
  const lang = translations[language] || translations.EN;
  
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  let value = lang;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Return the key if translation not found
      return key;
    }
  }
  
  return value || key;
};

export { en, ar }; 
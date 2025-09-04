import { useLanguage } from '../../app/_components/context/LanguageContext';
import { t } from '../translations';

export const useTranslation = () => {
  const { language, isRTL, changeLanguage } = useLanguage();

  const translate = (key) => {
    return t(key, language);
  };

  return {
    t: translate,
    language,
    isRTL,
    changeLanguage,
  };
}; 
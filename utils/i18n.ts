import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { getStorageItem, setStorageItem } from './storage';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const storedLanguage = await getStorageItem('user-language');
      if (storedLanguage) {
        return callback(storedLanguage);
      }

      const systemLanguage = Localization.locale.split('-')[0];
      callback(systemLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => { },
  cacheUserLanguage: (lng: string) => {
    // This method is no longer used in the new languageDetector
  }
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    resources: {
      en: {
        translation: require('../locales/en').translation
      },
      zh: {
        translation: require('../locales/zh').translation
      }
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

export const changeLanguage = async (lng: string) => {
  try {
    await setStorageItem('user-language', lng);
    return i18n.changeLanguage(lng);
  } catch (error) {
    console.error('Error changing language:', error);
    throw error;
  }
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

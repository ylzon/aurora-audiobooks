import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

let memoryStorage: string | null = null;

const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

const setStorageItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    if (memoryStorage) {
      return callback(memoryStorage);
    }

    try {
      const storedLanguage = await getStorageItem('user-language');
      if (storedLanguage) {
        memoryStorage = storedLanguage;
        return callback(storedLanguage);
      }

      const systemLanguage = Localization.locale.split('-')[0];
      memoryStorage = systemLanguage;
      callback(systemLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => { },
  cacheUserLanguage: (lng: string) => {
    memoryStorage = lng;
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
    memoryStorage = lng;
    return i18n.changeLanguage(lng);
  } catch (error) {
    console.error('Error changing language:', error);
    throw error;
  }
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

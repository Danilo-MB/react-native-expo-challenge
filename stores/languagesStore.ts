import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/utils/i18n';

type Language = 'en' | 'es';

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  toggleLanguage: async () => {
    set((state) => {
      const newLang = state.language === 'en' ? 'es' : 'en';
      i18n.changeLanguage(newLang);
      AsyncStorage.setItem('language', newLang);
      return { language: newLang };
    });
  },
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('language', lang);
    set({ language: lang });
  },
}));
import { create } from 'zustand';
import i18n from '@/utils/i18n';
import { typedStorage } from './stores';

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
      typedStorage.setItem('language', newLang);
      return { language: newLang };
    });
  },
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    typedStorage.setItem('language', lang);
    set({ language: lang });
  },
}));
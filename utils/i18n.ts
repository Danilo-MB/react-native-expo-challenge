import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      logout: 'Log out',
      cancel: 'Cancel',
      remove_from_favorites: 'Remove from Favorites',
      confirm_remove: 'Are you sure you want to remove this post from your favorites?',
      confirm_logout: 'Are you sure you want to log out?',
      posts: 'Posts',
      favorites: 'Favorites',
      users: 'Users'
    },
  },
  es: {
    translation: {
      logout: 'Salir',
      cancel: 'Cancelar',
      remove_from_favorites: 'Remover de favoritos',
      confirm_remove: 'Está seguro que desea remover este elemento de favoritos?',
      confirm_logout: 'Está seguro que desea salir de la aplicación?',
      posts: 'Posts',
      favorites: 'Favoritos',
      users: 'Usuarios'
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;

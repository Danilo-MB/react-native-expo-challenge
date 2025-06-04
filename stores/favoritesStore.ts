import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/schemas';

type FavoritesState = {
  favorites: Post[];
  loadFavorites: () => Promise<void>;
  addFavorite: (post: Post) => Promise<void>;
  removeFavorite: (postId: number) => Promise<void>;
  isFavorite: (postId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  loadFavorites: async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        const parsed: Post[] = JSON.parse(stored);
        set({ favorites: parsed });
      } else {
        set({ favorites: [] });
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  },

  addFavorite: async (post: Post): Promise<void> => {
    const existing = get().favorites;
    if (!existing.some((p) => p.id === post.id)) {
      const updated = [...existing, post];
      set({ favorites: updated });
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    }
  },

  removeFavorite: async (postId: number): Promise<void> => {
    const updated = get().favorites.filter((p) => p.id !== postId);
    set({ favorites: updated });
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },

  isFavorite: (postId: number): boolean => {
    return get().favorites.some((p) => p.id === postId);
  },
}));

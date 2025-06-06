import { create } from 'zustand';
import { Post } from '@/schemas';
import { typedStorage } from './stores';

export type FavoritesState = {
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
      const stored = await typedStorage.getItem('favorites');
      if (stored) {
        const parsed: Post[] = stored;
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
      await typedStorage.setItem('favorites', updated);
    }
  },

  removeFavorite: async (postId: number): Promise<void> => {
    const updated = get().favorites.filter((p) => p.id !== postId);
    set({ favorites: updated });
    await typedStorage.setItem('favorites', updated);
  },

  isFavorite: (postId: number): boolean => {
    return get().favorites.some((p) => p.id === postId);
  },
}));

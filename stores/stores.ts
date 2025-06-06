import { Post } from '@/schemas';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKey = 'user' | 'language' | 'favorites';
type Languages = 'es' | 'en';

type StorageValues = {
  user: { username: string };
  language: Languages;
  favorites: Post[];
}

export const typedStorage = {
  async setItem<K extends StorageKey>(key: K, value: StorageValues[K]): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async getItem<K extends StorageKey>(key: K): Promise<StorageValues[K] | null> {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  async removeItem<K extends StorageKey>(key: K): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
};

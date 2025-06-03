import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/schemas';

const FAVORITES_KEY = 'favorites';

export async function getFavorites(): Promise<Post[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveFavorite(post: Post) {
  const favorites = await getFavorites();
  const exists = favorites.some((p) => p.id === post.id);
  if (!exists) {
    const updated = [...favorites, post];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }
}

export async function removeFavorite(postId: number) {
  const favorites = await getFavorites();
  const updated = favorites.filter((p) => p.id !== postId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function isFavorite(postId: number): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((p) => p.id === postId);
}

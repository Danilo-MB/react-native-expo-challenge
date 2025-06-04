import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  username: string;
  name: string;
};

type AuthState = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (username, password) => {
    const { USERS } = await import('@/data/users');
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      set({ user: safeUser });
      await AsyncStorage.setItem('user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  },

  logout: async () => {
    set({ user: null });
    await AsyncStorage.removeItem('user');
  },

  restoreSession: async () => {
    const stored = await AsyncStorage.getItem('user');
    if (stored) {
      set({ user: JSON.parse(stored) });
    }
  },
}));

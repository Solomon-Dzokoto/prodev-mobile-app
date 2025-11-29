import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'driver' | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: 'customer' | 'driver') => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, role: 'customer' | 'driver') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, role) => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        user: { id: '1', name: 'Test User', email, role },
        isAuthenticated: true,
        isLoading: false,
      });
    }, 1000);
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  register: async (name, email, role) => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        user: { id: '1', name, email, role },
        isAuthenticated: true,
        isLoading: false,
      });
    }, 1000);
  },
}));

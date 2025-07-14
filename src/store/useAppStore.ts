import { create } from 'zustand';

interface AppState {
  user: any;
  setUser: (user: any) => void;
  // Add more global state as needed
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // Add more actions here
}));

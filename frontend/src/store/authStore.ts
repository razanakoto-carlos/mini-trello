import { create } from "zustand";
import { authStore } from "../types";

export const useAuthStore = create<authStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));

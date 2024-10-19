import { create } from "zustand";

import type { AutherConfig } from "@/shared";

interface AutherConfigState {
  autherConfig: AutherConfig | {};
  error: string | null;
  setAutherConfig: (newAutherConfig: AutherConfig) => void;
  setError: (newAutherConfig: string) => void;
}

export const useStore = create<AutherConfigState>((set) => ({
  autherConfig: {},
  error: null,
  setAutherConfig: (newAutherConfig: AutherConfig) => set({ autherConfig: newAutherConfig }),
  setError: (error: string) => set({ error }),
}));

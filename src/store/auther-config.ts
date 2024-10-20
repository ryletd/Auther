import { create } from "zustand";

import type { AutherConfig } from "@/shared";

interface AutherConfigState {
  autherConfig: AutherConfig | {};
  error: string | null;
  setAutherConfig: (newAutherConfig: AutherConfig) => void;
  setError: (newAutherConfig: string) => void;
}

const useStore = create<AutherConfigState>((set) => ({
  autherConfig: {},
  error: null,
  setAutherConfig: (newAutherConfig: AutherConfig) => set({ autherConfig: newAutherConfig }),
  setError: (error: string) => set({ error }),
}));

export const useAuthConfig = () => {
  const setError = useStore((state) => state.setError);
  const setAutherConfig = useStore((state) => state.setAutherConfig);
  return { setError, setAutherConfig };
};

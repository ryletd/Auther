import { create } from "zustand";

import type { AutherConfig } from "@/shared";

interface AutherConfigState {
  autherConfig: AutherConfig | {};
  setAutherConfig: (newAutherConfig: AutherConfig) => void;
}

const useStore = create<AutherConfigState>((set) => ({
  autherConfig: {},
  setAutherConfig: (newAutherConfig: AutherConfig) => set({ autherConfig: newAutherConfig }),
}));

export default useStore;

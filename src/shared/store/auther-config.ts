import { create } from "zustand";

import { DEFAULT_AUTHER_CONFIG } from "../constants/auther-config";

import type { AutherConfig } from "@/shared";

type AutherConfigState = {
  autherConfig: AutherConfig;
  setAutherConfig: (newAutherConfig: AutherConfig) => void;
};

const useStore = create<AutherConfigState>((set) => ({
  autherConfig: DEFAULT_AUTHER_CONFIG,
  setAutherConfig: (autherConfig: AutherConfig) => set({ autherConfig }),
}));

export const useAuthConfig = () => useStore();

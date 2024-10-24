import type { AutherConfig } from "@/shared";

export const saveAutherConfig = async (newConfig: AutherConfig): Promise<void> => {
  return chrome.storage.local.set<{ auther: AutherConfig }>({ auther: newConfig });
};

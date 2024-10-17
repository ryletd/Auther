import { getAutherConfig } from "@/shared";

import type { AutherConfig } from "@/shared";

export const saveAutherConfig = async (newConfig: Partial<AutherConfig>): Promise<void> => {
  const config = await getAutherConfig();

  return chrome.storage.local.set<{ auther: AutherConfig }>({ auther: { ...config, ...newConfig } });
};

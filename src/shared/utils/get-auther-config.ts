import { DEFAULT_AUTHER_CONFIG } from "../constants/auther-config";

import type { AutherConfig } from "@/shared";

export const getAutherConfig = async (): Promise<AutherConfig> => {
  try {
    const { auther } = await chrome.storage.local.get<{ auther: AutherConfig | undefined }>("auther");

    return auther ?? DEFAULT_AUTHER_CONFIG;
  } catch (error) {
    return DEFAULT_AUTHER_CONFIG;
  }
};

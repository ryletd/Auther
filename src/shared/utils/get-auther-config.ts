import { DEFAULT_AUTHER_CONFIG } from "../config/auther-config";

import type { AutherConfig } from "@/shared";

export const getAutherConfig = async (): Promise<AutherConfig> => {
  try {
    const { auther } = await chrome.storage.local.get<{ auther: AutherConfig | undefined }>("auther");
    return auther ?? DEFAULT_AUTHER_CONFIG;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred while retrieving the configuration");
    }
  }
};

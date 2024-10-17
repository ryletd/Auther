import type { AutherConfig } from "@/shared";

const DEFAULT_AUTHER_CONFIG: AutherConfig = {
  lastSave: 0,
  lastUpdate: 0,
  savedSecretsAmount: 0,
  secrets: [],
};

export const getAutherConfig = (): Promise<AutherConfig> =>
  chrome.storage.local
    .get<{ auther: AutherConfig | undefined }>("auther")
    .then(({ auther }) => auther ?? DEFAULT_AUTHER_CONFIG);

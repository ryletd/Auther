import type { AutherConfig } from "@/shared";

const DEFAULT_AUTHER_CONFIG: AutherConfig = {
  lastExportTime: 0,
  exportedSecrets: [],
  secrets: [],
};

export const getAutherConfig = (): Promise<AutherConfig> =>
  chrome.storage.local
    .get<{ auther: AutherConfig | undefined }>("auther")
    .then(({ auther }) => auther ?? DEFAULT_AUTHER_CONFIG);

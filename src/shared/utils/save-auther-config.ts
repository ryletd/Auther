import { encryptText } from "@/shared";

import type { AutherConfig } from "@/shared";

export const saveAutherConfig = async (newConfig: AutherConfig): Promise<void> => {
  const config: AutherConfig = {
    ...newConfig,
    exportedSecrets: newConfig.exportedSecrets.map(encryptText),
    secrets: newConfig.secrets.map((secret) => ({ ...secret, secret: encryptText(secret.secret) })),
  };

  return chrome.storage.local.set<{ auther: AutherConfig }>({ auther: config });
};

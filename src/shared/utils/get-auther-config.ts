import { DEFAULT_AUTHER_CONFIG, decryptText } from "@/shared";

import type { AutherConfig } from "@/shared";

export const getAutherConfig = async (encrypted = false): Promise<AutherConfig> => {
  try {
    const { auther } = await chrome.storage.local.get<{ auther: AutherConfig | undefined }>("auther");

    if (!auther) {
      return DEFAULT_AUTHER_CONFIG;
    }

    if (encrypted) {
      return auther;
    }

    const config: AutherConfig = {
      ...auther,
      exportedSecrets: auther.exportedSecrets.map(decryptText),
      secrets: auther.secrets.map((secret) => ({ ...secret, secret: decryptText(secret.secret) })),
    };

    return config;
  } catch (error) {
    return DEFAULT_AUTHER_CONFIG;
  }
};

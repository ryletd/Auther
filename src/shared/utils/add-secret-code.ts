import { getAutherConfig } from "@/shared";

import type { Secret, AutherConfig } from "@/shared";

export const addSecretCode = async (secret: Secret): Promise<void> => {
  const config = await getAutherConfig();

  return chrome.storage.local.set<{ auther: AutherConfig }>({
    auther: { ...config, secrets: config.secrets.concat(secret) },
  });
};

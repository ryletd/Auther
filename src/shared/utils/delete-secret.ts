import { getAutherConfig } from "@/shared";

import type { AutherConfig } from "@/shared";

export const deleteSecret = async (secret: string): Promise<void> => {
  const config = await getAutherConfig();
  const exportedSecrets = config.exportedSecrets.filter((item) => item !== secret);
  const secrets = config.secrets.filter((item) => item.secret !== secret);

  return chrome.storage.local.set<{ auther: AutherConfig }>({ auther: { ...config, exportedSecrets, secrets } });
};

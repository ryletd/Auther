import { getAutherConfig, setAutherConfig, decryptText } from "@/shared";

import type { AutherConfig } from "@/shared";

export const exportAutherConfig = async (): Promise<void> => {
  const config = await getAutherConfig(true);
  const extendedConfig = {
    ...config,
    lastExportTime: Date.now(),
    exportedSecrets: config.secrets.map(({ secret }) => secret),
  };

  const blob = new Blob([JSON.stringify(extendedConfig, null, 2)], { type: "text/plain" });
  const a = document.createElement("a");

  a.download = "auther-config-backup.json";
  a.href = window.URL.createObjectURL(blob);
  a.click();

  window.URL.revokeObjectURL(a.href);

  const decryptedConfig: AutherConfig = {
    ...extendedConfig,
    exportedSecrets: extendedConfig.exportedSecrets.map(decryptText),
    secrets: extendedConfig.secrets.map((secret) => ({ ...secret, secret: decryptText(secret.secret) })),
  };
  await setAutherConfig(decryptedConfig);
};

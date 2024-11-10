import { getAutherConfig, setAutherConfig, decryptText } from "@/shared";

import type { AutherConfig } from "@/shared";

export const importAutherConfig = async (encryptedImportedConfig: AutherConfig): Promise<void> => {
  const config = await getAutherConfig();
  const importedConfig: AutherConfig = {
    ...encryptedImportedConfig,
    exportedSecrets: encryptedImportedConfig.exportedSecrets.map(decryptText),
    secrets: encryptedImportedConfig.secrets.map((secret) => ({ ...secret, secret: decryptText(secret.secret) })),
  };

  await setAutherConfig({
    lastExportTime:
      importedConfig.lastExportTime > config.lastExportTime ? importedConfig.lastExportTime : config.lastExportTime,
    exportedSecrets: importedConfig.exportedSecrets.concat(
      config.exportedSecrets.filter((item) => !importedConfig.exportedSecrets.includes(item))
    ),
    secrets: config.secrets.concat(
      importedConfig.secrets.filter(({ secret }) => !config.secrets.find((item) => item.secret === secret))
    ),
  });
};

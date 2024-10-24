import { getAutherConfig, setAutherConfig } from "@/shared";

import type { AutherConfig } from "@/shared";

export const importAutherConfig = async (importedConfig: AutherConfig): Promise<void> => {
  const config = await getAutherConfig();

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

import { create } from "zustand";

import { DEFAULT_AUTHER_CONFIG, saveAutherConfig } from "@/shared";

import type { AutherConfig, Secret } from "@/shared";

type AutherConfigState = {
  autherConfig: AutherConfig;
};

export const useAutherConfigStore = create<AutherConfigState>(() => ({
  autherConfig: DEFAULT_AUTHER_CONFIG,
}));

export const setAutherConfig = async (autherConfig: AutherConfig) => {
  useAutherConfigStore.setState({ autherConfig });

  await saveAutherConfig(autherConfig);
};

export const addSecretCode = async (secret: Secret): Promise<void> => {
  const { autherConfig } = useAutherConfigStore.getState();
  const isExist = autherConfig.secrets.find((item) => item.secret === secret.secret);

  if (isExist) {
    return;
  }

  const state = { ...autherConfig, secrets: autherConfig.secrets.concat(secret) };

  await setAutherConfig(state);
};

export const deleteSecretCode = async (secret: string): Promise<void> => {
  const { autherConfig } = useAutherConfigStore.getState();
  const exportedSecrets = autherConfig.exportedSecrets.filter((item) => item !== secret);
  const secrets = autherConfig.secrets.filter((item) => item.secret !== secret);

  const state = { ...autherConfig, exportedSecrets, secrets };

  await setAutherConfig(state);
};

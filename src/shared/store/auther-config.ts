import { create } from "zustand";

import { DEFAULT_AUTHER_CONFIG, saveAutherConfig, getIdFromString } from "@/shared";

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

export const addSecretCode = async (secret: Omit<Secret, "id" | "addedDate">): Promise<void> => {
  const { autherConfig } = useAutherConfigStore.getState();
  const isExist = autherConfig.secrets.find((item) => item.secret === secret.secret);

  if (isExist) {
    return;
  }

  const state = {
    ...autherConfig,
    secrets: autherConfig.secrets.concat({ ...secret, id: getIdFromString(secret.secret), addedDate: Date.now() }),
  };

  await setAutherConfig(state);
};

export const deleteSecretCode = async (secret: string): Promise<void> => {
  const { autherConfig } = useAutherConfigStore.getState();
  const exportedSecrets = autherConfig.exportedSecrets.filter((item) => item !== secret);
  const secrets = autherConfig.secrets.filter((item) => item.secret !== secret);

  const state = { ...autherConfig, exportedSecrets, secrets };

  await setAutherConfig(state);
};

export const editSecretCode = async (secret: Secret): Promise<void> => {
  const { autherConfig } = useAutherConfigStore.getState();
  const secretIndex = autherConfig.secrets.findIndex(({ id }) => id === secret.id);

  if (secretIndex < 0) {
    return;
  }

  const state = {
    ...autherConfig,
    secrets: [...autherConfig.secrets.slice(0, secretIndex), secret, ...autherConfig.secrets.slice(secretIndex + 1)],
  };

  await setAutherConfig(state);
};

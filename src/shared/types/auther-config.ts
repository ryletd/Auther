import type { Secret } from "./secret";

export type AutherConfig = {
  // Дата последнего добавленного секретного ключа
  lastUpdate: number;
  // Дата последнего экспорта конфига
  lastSave: number;
  // Количество секретных ключей при последнем экспорте
  savedSecretsAmount: number;
  // Секретные ключи
  secrets: Secret[];
};

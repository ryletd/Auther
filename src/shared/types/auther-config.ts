import type { Secret } from "./secret";

export type AutherConfig = {
  // Дата последнего экспорта конфига
  lastExportTime: number;
  // Секретные коды, которые были экспортированы
  exportedSecrets: string[];
  // Секретные ключи
  secrets: Secret[];
};

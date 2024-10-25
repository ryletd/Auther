export const getIdFromString = (line: string): string =>
  line
    .replace(/\s/g, "")
    .toLowerCase()
    .split("")
    .map((letter) => letter.charCodeAt(0) - 96)
    .join("")
    .substring(0, 20);

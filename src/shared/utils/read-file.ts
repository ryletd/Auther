export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      if (target?.result) {
        resolve(target.result as string);
      } else {
        resolve("");
      }
    };

    reader.onerror = () => {
      resolve("");
    };

    reader.readAsText(file);
  });
};

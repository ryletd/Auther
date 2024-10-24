type ResultType = "text" | "url";

export const readFile = (file: File, resultType: ResultType = "text"): Promise<string> => {
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

    switch (resultType) {
      case "text":
        return reader.readAsText(file);

      case "url":
        return reader.readAsDataURL(file);

      default:
        return null;
    }
  });
};

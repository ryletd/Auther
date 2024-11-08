type checkImageExistsType = (url: string) => Promise<boolean>;

export const checkImageExists: checkImageExistsType = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

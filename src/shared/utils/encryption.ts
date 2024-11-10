import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

const SECRET_KEY = "ryletd";

export const encryptText = (text: string): string => {
  return AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (encryptedText: string): string => {
  return AES.decrypt(encryptedText, SECRET_KEY).toString(encUtf8);
};

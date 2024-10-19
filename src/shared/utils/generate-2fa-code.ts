import { authenticator } from "otplib";

export const generate2faCode = (secret: string): string => {
  try {
    return authenticator.generate(secret);
  } catch {
    return "******";
  }
};

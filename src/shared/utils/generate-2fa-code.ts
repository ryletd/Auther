import { authenticator } from "otplib";

export const generate2faCode = (secret: string): string => authenticator.generate(secret);

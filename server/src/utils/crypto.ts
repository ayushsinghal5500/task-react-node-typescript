// server/src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const BACKEND_SECRET_KEY = process.env.BACKEND_SECRET_KEY || 'backend_secret';

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, BACKEND_SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, BACKEND_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

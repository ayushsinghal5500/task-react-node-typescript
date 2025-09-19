import CryptoJS from 'crypto-js';

/**
 * Use Vite environment variable for frontend encryption key
 * Make sure you have VITE_CLIENT_KEY in .env
 */
const FRONTEND_SECRET_KEY = import.meta.env.VITE_CLIENT_KEY || 'default_client_key';

/**
 * Encrypt plain text
 * @param data string
 * @returns encrypted string
 */
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, FRONTEND_SECRET_KEY).toString();
};

/**
 * Decrypt encrypted string
 * @param cipherText string
 * @returns decrypted string
 */
export const decryptData = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, FRONTEND_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

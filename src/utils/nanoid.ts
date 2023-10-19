import { customAlphabet } from 'nanoid';

/**
 * @name generateUID
 * @description
 * This function generates a unique ID
 * @returns string => unique ID of 5 characters
 */
export const generateUID = () => {
  const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ;,?:@&=+$-_.!~*()#',
    5,
  );
  return nanoid();
};

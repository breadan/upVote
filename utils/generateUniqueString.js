import { customAlphabet } from 'nanoid';

const generateUniqueString = () => {
  const nanoid = customAlphabet('0123456789abcdefghKLMNOPQRSTUVWXYZ', 5);
  return nanoid();
};

export default generateUniqueString;

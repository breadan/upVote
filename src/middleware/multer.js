import multer from 'multer';
import { nanoid } from 'nanoid';
import generateUniqueString from '../../utils/generateUniqueString.js';

export const multerMiddle = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      const uniqueFileName = generateUniqueString(6) + '-' + file.originalname;
      cb(null, Date.now() + uniqueFileName);
    },
  });
  //file filter
  const fileFilter = (req, file, cb) => {
    // if (file.mimetype === 'video/mp4' || file.mimetype === 'image/png') {
    // if (['video/mp4', 'image/png', 'image/jpeg'].includes(file.mimetype)) {
    if (['mp4', 'png', 'jpeg'].includes(file.mimetype.split('/')[1])) {
      return cb(null, true);
    } else {
      cb(new Error('file Formate Not Allowed'), false);
    }
  };
  const file = multer({ fileFilter, storage });
  return file;
};

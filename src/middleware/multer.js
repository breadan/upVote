import multer from 'multer';
import generateUniqueString from '../../utils/generateUniqueString.js';
import allowedExtensions from '../../utils/allowedExtensions.js';
import fs from 'fs';
import path from 'path';

export const multerMiddle = ({
  extensions = allowedExtensions.image,
  filePath = 'general',
}) => {
  //check file path
  const destination = path.resolve(`uploads/${filePath}`);
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true }); // recursive to create nested directories folders
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
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
    if (String(extensions).includes(file.mimetype.split('/')[1])) {
      return cb(null, true);
    } else {
      cb(new Error('file Formate Not Allowed'), false);
    }
  };
  const file = multer({ fileFilter, storage });
  return file;
};

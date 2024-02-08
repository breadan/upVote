export { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  getUserProfile,
  signInHandler,
  signUpHandler,
  testPhotoProfile,
} from '../modules/user/user.controller.js';
import express from 'express';
import auth from '../middleware/auth.middleware.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import signUpSchema from '../modules/user/user.validationSchemas.js';
import { multerMiddle } from '../middleware/multer.js';
import allowedExtensions from '../../utils/allowedExtensions.js';

const userRouter = express.Router();
// "[ ]"sign up user
userRouter.post(
  '/v1/signupuser',
  validationMiddleware(signUpSchema),
  expressAsyncHandler(signUpHandler)
);
// "[ ]"sign In user
userRouter.post('/v1/signinuser', expressAsyncHandler(signInHandler));
// "[ ]"userprofile
userRouter.get('/v1/userprofile', auth, expressAsyncHandler(getUserProfile));
// "[ ]"userprofile photo
// userRouter.post(
//   '/v1/upload',
//   multerMiddle({
//     extensions: allowedExtensions.image,
//     filePath: 'profile',
//   }).single('profile'),
//   expressAsyncHandler(testPhotoProfile)
// );
// "[ ]"userprofile photo send many
userRouter.post(
  '/v1/upload',
  multerMiddle({
    extensions: allowedExtensions.image,
    filePath: 'customer/profiles',
  }).fields([
    { name: 'profile', maxCount: 2 },
    { name: 'profile1', maxCount: 1 },
    { name: 'profile2', maxCount: 2 },
  ]),
  expressAsyncHandler(testPhotoProfile)
);

export default userRouter;

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
userRouter.post(
  '/v1/upload',
  multerMiddle().single('profile'),
  expressAsyncHandler(testPhotoProfile)
);

export default userRouter;

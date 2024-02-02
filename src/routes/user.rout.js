export { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  getUserProfile,
  signInHandler,
  signUpHandler,
} from '../modules/user/user.controller.js';
import express from 'express';
import auth from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/v1/signupuser', expressAsyncHandler(signUpHandler));
userRouter.post('/v1/signinuser', expressAsyncHandler(signInHandler));
userRouter.get('/v1/userprofile', auth(), expressAsyncHandler(getUserProfile));

export default userRouter;

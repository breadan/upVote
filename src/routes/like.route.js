import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  getAllLikesProduct,
  getUserHistory,
  likeOrUnlike,
  likeUnLikeComment,
} from '../modules/like/like.controller.js';
import expressAsyncHandler from 'express-async-handler';

const likeRouter = express.Router();

//like Product

likeRouter.post('/:productId', auth, expressAsyncHandler(likeOrUnlike));
likeRouter.get('/:productId', expressAsyncHandler(getAllLikesProduct));
likeRouter.post(
  '/likeC/:commentId',
  auth,
  expressAsyncHandler(likeUnLikeComment)
);
likeRouter.get('/', auth, expressAsyncHandler(getUserHistory));

export default likeRouter;

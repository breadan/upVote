import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  getAllLikesProduct,
  likeOrUnlike,
} from '../modules/like/like.controller.js';
import expressAsyncHandler from 'express-async-handler';

const likeRouter = express.Router();

//like Product

likeRouter.post('/v1/like/:productId', auth, expressAsyncHandler(likeOrUnlike));
likeRouter.get(
  '/v1/getlikes/:productId',
  expressAsyncHandler(getAllLikesProduct)
);

export default likeRouter;

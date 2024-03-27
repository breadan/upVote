import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  getAllLikesComment,
  getAllLikesProduct,
  getUserHistory,
  likeOrUnlike,
  likeOrUnlikeGeneral,
  likeUnLikeComment,
  likeUnlikeProduct,
} from '../modules/like/like.controller.js';
import expressAsyncHandler from 'express-async-handler';
import productRoles from '../modules/product/product.roles.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import { likeProductSchema } from '../modules/product/product.validator.js';
import likeRoles from '../modules/like/like.roles.js';

const likeRouter = express.Router();

//like Product

likeRouter.post(
  '/:productId',
  auth(productRoles.ADD_PRODUCT),
  validationMiddleware(likeProductSchema),
  expressAsyncHandler(likeOrUnlike)
);
likeRouter.get('/:productId', auth(), expressAsyncHandler(getAllLikesProduct));
likeRouter.get('/:commentId', expressAsyncHandler(getAllLikesComment));
likeRouter.post(
  '/likeC/:commentId',
  auth,
  expressAsyncHandler(likeUnLikeComment)
);
likeRouter.get('/', auth(), expressAsyncHandler(getUserHistory));

//likes General
likeRouter.post(
  '/general/:likeDoneId',
  auth(likeRoles.ADD_LIKES),
  // validationMiddleware(likeProductSchema),
  expressAsyncHandler(likeOrUnlikeGeneral)
);

//like with axios
likeRouter.post(
  '/like/:productId',
  auth(likeRoles.ADD_LIKES),
  validationMiddleware(likeProductSchema),
  expressAsyncHandler(likeUnlikeProduct)
);

export default likeRouter;

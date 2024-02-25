import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import auth from '../middleware/auth.middleware.js';
import { addComment } from '../modules/comment/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/:productId', auth, expressAsyncHandler(addComment));
// likeRouter.get(
//   '/v1/getlikes/:productId',
//   expressAsyncHandler(getAllLikesProduct)
// );

export default commentRouter;

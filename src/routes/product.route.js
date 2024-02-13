import expressAsyncHandler from 'express-async-handler';
import auth from '../middleware/auth.middleware.js';
import { multerHost } from '../middleware/multer.js';
import {
  addProduct,
  updateProduct,
} from '../modules/product/product.controller.js';
import express from 'express';
import allowedExtensions from '../../utils/allowedExtensions.js';

const productRouter = express.Router();

productRouter.post(
  '/v1/addproduct',
  auth,
  multerHost({
    extensions: allowedExtensions.image,
  }).array('image', 2),
  expressAsyncHandler(addProduct)
);

productRouter.put(
  '/v1/updateproduct/:productId',
  auth,
  multerHost({
    extensions: allowedExtensions.image,
  }).single('image'),
  expressAsyncHandler(updateProduct)
);

export default productRouter;

import expressAsyncHandler from 'express-async-handler';
import auth from '../middleware/auth.middleware.js';
import { multerHost } from '../middleware/multer.js';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../modules/product/product.controller.js';
import express from 'express';
import allowedExtensions from '../../utils/allowedExtensions.js';

const productRouter = express.Router();

//Add Product ************************************************
productRouter.post(
  '/v1/product',
  auth,
  multerHost({
    extensions: allowedExtensions.image,
  }).array('image', 2),
  expressAsyncHandler(addProduct)
);

//Update Product ************************************************
productRouter.put(
  '/v1/product/:productId',
  auth,
  multerHost({
    extensions: allowedExtensions.image,
  }).single('image'),
  expressAsyncHandler(updateProduct)
);

//Delete Product ************************************************
productRouter.delete(
  '/v1/product/:productId',
  auth,
  expressAsyncHandler(deleteProduct)
);

//Get All Products ************************************************
productRouter.get('/v1/product', auth, expressAsyncHandler(getAllProducts));

export default productRouter;

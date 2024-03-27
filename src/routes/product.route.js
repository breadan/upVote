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
import productRoles from '../modules/product/product.roles.js';

const productRouter = express.Router();
//if u want access only admin in this router:
// productRouter.use(auth(['admin']));

//Add Product ************************************************
productRouter.post(
  '/',
  auth(productRoles.ADD_PRODUCT),

  multerHost({
    extensions: allowedExtensions.image,
  }).array('image', 2),
  expressAsyncHandler(addProduct)
);

//Update Product ************************************************
productRouter.put(
  '/:productId',
  auth(productRoles.PUT_PRODUCT),
  multerHost({
    extensions: allowedExtensions.image,
  }).single('image'),
  expressAsyncHandler(updateProduct)
);

//Delete Product ************************************************
productRouter.delete(
  '/:productId',
  auth(productRoles.ADD_PRODUCT),
  expressAsyncHandler(deleteProduct)
);

//Get All Products ************************************************
productRouter.get(
  '/',
  auth(productRoles.GET_ALL_PRODUCTS),
  expressAsyncHandler(getAllProducts)
);
//, auth(['admin'])

export default productRouter;

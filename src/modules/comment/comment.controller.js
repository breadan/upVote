import { commentModel } from '../../../models/comment.model.js';
import { productModel } from '../../../models/product.model.js';

const addComment = async (req, res, next) => {
  const { content } = req.body;
  const { _id } = req.user;
  const { productId } = req.params;

  //check product id
  const product = await productModel.findById(productId);
  if (!product) return next(new Error('Product not found', { cause: 404 }));

  //create Comment
  const comment = await commentModel.create({ content, addBy: _id, productId });
  res.status(200).json({ message: 'Comment created Successfully', comment });
};

export { addComment };

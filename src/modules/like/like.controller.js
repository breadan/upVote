import { likesModel } from '../../../models/like.model.js';
import { productModel } from '../../../models/product.model.js';

//create Like************************************************

const likeOrUnlike = async (req, res, next) => {
  const { productId } = req.params;
  const { _id } = req.user;
  const { onModel } = req.body;

  //check if product exists
  const product = await productModel.findById(productId);
  if (!product) return next(new Error('Product not found', { cause: 404 }));

  // check
  const isAlreadyLiked = await likesModel.findOne({
    likedBy: _id,
    likeDoneId: productId,
  });
  if (isAlreadyLiked) {
    await likesModel.findOneAndDelete({ likedBy: _id, likeDoneId: productId });
    product.numberOfLikes--;
    await product.save();
    return res.status(200).json({
      message: 'Like deleted successfully',
      product,
    });
  }

  //create like document
  const like = await likesModel.create({
    likedBy: _id,
    onModel,
    likeDoneId: productId,
    productId,
  });
  product.numberOfLikes++;
  await product.save();
  res.status(200).json({
    message: 'Like created successfully',
    data: like,
    product,
  });
};

//get all Likes ************************************************
const getAllLikesProduct = async (req, res, next) => {
  const likes = await likesModel
    .find({ likeDoneId: req.params.productId })
    .populate([
      {
        path: 'likeDoneId',
      },
    ]);
  res.status(200).json({ message: 'success', data: likes });
};

export { likeOrUnlike, getAllLikesProduct };

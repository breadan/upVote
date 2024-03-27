import axios from 'axios';
import { commentModel } from '../../../models/comment.model.js';
import { likesModel } from '../../../models/like.model.js';
import { productModel } from '../../../models/product.model.js';
import { replayModel } from '../../../models/replay.model.js';

//create Like Product ************************************************

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

//get all Likes Product************************************************
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
//get all Comment ************************************************
const getAllLikesComment = async (req, res, next) => {
  const likes = await likesModel
    .find({ likeDoneId: req.params.commentId })
    .populate([
      {
        path: 'likeDoneId',
      },
    ]);
  res.status(200).json({ message: 'success', data: likes });
};
//Comment Likes ************************************************
const likeUnLikeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { _id } = req.user;
  const { onModel } = req.body;

  //check product Id
  const comment = await commentModel.findById(commentId);
  if (!comment) return next(new Error('Comment not found', { cause: 404 }));

  // check if likes
  const isAlreadyLiked = await likesModel.findOne({
    likedBy: _id,
    likeDoneId: commentId,
  });
  if (isAlreadyLiked) {
    await likesModel.findOneAndDelete({ likedBy: _id, likeDoneId: commentId });
    comment.numberOfLikes -= 1;
    await comment.save();
    return res.status(200).json({
      message: 'UnLike Done',
      count: comment.numberOfLikes,
    });
  }
  //create like document
  const like = await likesModel.create({
    likedBy: _id,
    onModel,
    likeDoneId: commentId,
  });
  // console.log(like);

  comment.numberOfLikes += 1;
  await comment.save();
  res.status(200).json({
    message: 'Like Done',
    count: comment.numberOfLikes,
  });
};
//Get User Likes History ************************************************
const getUserHistory = async (req, res, next) => {
  const { _id } = req.user;
  const likes = await likesModel
    .find({
      likedBy: _id,
      onModel: req.query.onModel, //optional
    }) //many populate
    // .populate([{ path: 'likeDoneId' }, { path: 'likedBy' }]);
    .populate([
      {
        path: 'likeDoneId',
        populate: {
          path: 'addBy',
          select: 'name',
        },
      },
    ]);
  res.status(200).json({ message: 'success', likes });
};

//create Like General ************************************************

const likeOrUnlikeGeneral = async (req, res, next) => {
  console.log('gggggg');
  const { likeDoneId } = req.params;
  const { _id } = req.user;
  const { onModel } = req.body;
  //check model
  let dbModel = '';
  if (onModel === 'Product') dbModel = productModel;
  else if (onModel === 'Comment') dbModel = commentModel;
  else if (onModel === 'Reply') dbModel = replayModel;

  //check if product exists
  const document = await dbModel.findById(likeDoneId);
  if (!document)
    return next(new Error(`${onModel} is Not Found`, { cause: 404 }));

  // check
  const isAlreadyLiked = await likesModel.findOne({
    likedBy: _id,
    likeDoneId,
  });
  if (isAlreadyLiked) {
    await likesModel.findOneAndDelete(isAlreadyLiked._id);
    document.numberOfLikes -= 1;
    await document.save();
    return res.status(200).json({
      message: 'Like deleted successfully',
      onModel,
    });
  }

  //create like document
  const like = await likesModel.create({
    likedBy: _id,
    onModel,
    likeDoneId,
  });
  document.numberOfLikes += 1;
  await document.save();
  res.status(200).json({
    message: 'Like created successfully',
    data: like,
    count: document.numberOfLikes,
  });
};

//different logic to create like Reply ********************************
const likeUnlikeProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { token } = req.headers;
  const { onModel } = req.body;

  //axios
  axios({
    method: 'post',
    url: `http://localhost:7000/v1/like/${productId}`,
    headers: {
      token,
    },
    data: {
      onModel, //this data will send from body
    },
  })
    .then((response) => {
      //(res) ==> Error
      console.log(response.data);
      return res.status(200).json({
        message: 'Like created successfully',
        response: response.data,
      });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    });
};

export {
  likeOrUnlike,
  getAllLikesProduct,
  likeUnLikeComment,
  getUserHistory,
  getAllLikesComment,
  likeOrUnlikeGeneral,
  likeUnlikeProduct,
};

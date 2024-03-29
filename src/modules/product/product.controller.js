import { commentModel } from '../../../models/comment.model.js';
import { productModel } from '../../../models/product.model.js';
import cloudinaryConnection from '../../../utils/cloudinary.js';
import generateUniqueString from '../../../utils/generateUniqueString.js';

//Add Product ************************************************
const addProduct = async (req, res, next) => {
  const { title, caption } = req.body;
  const { _id } = req.user;
  let images = [];
  let publicIdsArr = [];
  if (!req.files?.length)
    return next(new Error('Please Upload at least one', { cause: 400 }));

  const folderId = generateUniqueString(5);
  for (const file of req.files) {
    const { secure_url, public_id } =
      await cloudinaryConnection().uploader.upload(file.path, {
        folder: `upVoteImages/products/${_id}/${folderId}`,
      });
    publicIdsArr.push(public_id);
    images.push({ secure_url, public_id, folderId });
  }
  const product = await productModel.create({
    title,
    caption,
    images,
    addBy: _id,
  });
  //if Not Product
  if (!product) {
    const data = await cloudinaryConnection().api.delete_resources(
      publicIdsArr
    );
    return next(new Error('Error While Created Product', { cause: 500 }));
  }
  res.status(201).json({
    message: 'Product created successfully',
    data: product,
  });
};

//Update Product ************************************************
const updateProduct = async (req, res, next) => {
  const { title, caption, oldPublicId } = req.body;
  const { _id } = req.user;
  const { productId } = req.params;

  //check if product
  const product = await productModel.findOne({ addBy: _id, _id: productId });
  // console.log(product);
  if (!product) return next(new Error('Product not found', { cause: 404 }));
  //update product
  if (title) product.title = title;
  if (caption) product.caption = caption;

  if (oldPublicId) {
    if (!req.file)
      return next(new Error('Please Upload the New Image', { cause: 400 }));

    //delete old image from cloudinary
    await cloudinaryConnection().uploader.destroy(oldPublicId);
    //upload new image to cloudinary
    const { secure_url, public_id } =
      await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `upVoteImages/products/${_id}/${product.images[0].folderId}`,
      });

    //update url in DB
    product.images.map((image) => {
      if (image.public_id === oldPublicId) {
        image.public_id = public_id;
        image.secure_url = secure_url;
      }
      // return image;
    });
  }

  await product.save();
  res.status(200).json({
    message: 'Product updated successfully',
    data: product,
  });
};

//Delete Product ************************************************
const deleteProduct = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;

  //check
  const product = await productModel.findOneAndDelete({
    addBy: _id,
    _id: productId,
  });
  if (!product) return next(new Error('Product Not Found', { cause: 404 }));

  //create arr & push data to deleted
  let publicIdsArr = [];
  for (const image of product.images) {
    publicIdsArr.push(image.public_id);
  }
  await cloudinaryConnection().api.delete_resources(publicIdsArr);
  res.status(200).json({
    message: 'Product deleted successfully',
  });
};
//Get All Products ************************************************
const getAllProducts = async (req, res, next) => {
  // const products = await productModel.find().sort({ createdAt: -1 });
  //to convert products to object not BSON
  // const products = await productModel.find().lean();

  //to get comments for all products
  // for (const product of products) {
  //   const comments = await commentModel.find({ productId: product._id });
  //   //add key to put data of comment in it
  //   product.comments = comments;
  // }

  //cursor method
  const products = productModel.find().cursor();
  let finalResult = [];
  for (
    let doc = await products.next();
    doc != null;
    doc = await products.next()
  ) {
    const comments = await commentModel.find({ productId: doc._id });
    const docObject = doc.toObject();
    docObject.comments = comments;
    finalResult.push(docObject);
  }
  res.status(200).json({ message: 'done', products: finalResult });
};

export { addProduct, updateProduct, deleteProduct, getAllProducts };

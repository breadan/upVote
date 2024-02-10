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
  // console.log(images);
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
  // console.log(product);
  res.status(201).json({
    message: 'Product created successfully',
    data: product,
  });
};

export { addProduct };

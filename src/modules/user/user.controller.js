import { userModel } from '../../../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenModel from '../../../models/token.model.js';
import cloudinaryConnection from '../../../utils/cloudinary.js';

//signUp************************************************
const signUpHandler = async (req, res, next) => {
  const { name, email, password, age, gender } = req.body;
  const isEmailExists = await userModel.findOne({ email });
  if (isEmailExists) {
    return next(new Error('Email is Already exists', { cause: 409 }));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    age,
    gender,
  });
  return res
    .status(201)
    .json({ message: 'User created successfully', newUser });
};

//signIn************************************************
const signInHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const isEmailExists = await userModel.findOne({ email });
  if (!isEmailExists) {
    return next(new Error('invalid login credentials', { cause: 404 }));
  }
  //compare password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    isEmailExists.password
  );
  if (!isPasswordMatch) {
    return next(new Error('invalid login credentials', { cause: 404 }));
  }
  //Token
  const token = jwt.sign(
    {
      _id: isEmailExists._id,
      email: isEmailExists.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIR }
  );
  //timer in mongoose
  const expireAt = new Date();
  expireAt.setTime(expireAt.getTime() + 1000 * 60 * 4);
  await tokenModel.create({ token, userId: isEmailExists._id, expireAt });

  return res.status(200).json({ message: 'User login successfully', token });
};
//get User Profile************************************************
const getUserProfile = async (req, res) => {
  //req.user come from auth.middleware
  res.status(200).json({ message: 'User profile', data: req.user });
};

//test photo Profile************************************************

const testPhotoProfile = async (req, res, next) => {
  res.status(200).json({ message: 'User profile', data: req.files });
};

//test photo Profile Host************************************************

const profileHost = async (req, res, next) => {
  //upload on cloudinary server
  console.log(req.file);
  const data = await cloudinaryConnection().uploader.upload(req.file.path, {
    folder: 'upvote/profiles',
    public_id: req.file.filename,
  });
  res.status(200).json({ message: 'User data', data });
};

//test demo Profile Host************************************************
const demoHost = async (req, res, next) => {
  const data = await cloudinaryConnection().uploader.upload(req.file.path, {
    folder: 'upvote/videos',
    resource_type: 'video',
  });
  res.status(200).json({ message: 'User data', data });
};

//DELETE USER ************************************************

//UPDATE USER ************************************************
export {
  signUpHandler,
  signInHandler,
  getUserProfile,
  testPhotoProfile,
  profileHost,
  demoHost,
};

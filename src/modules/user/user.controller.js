import { userModel } from '../../../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenModel from '../../../models/token.model.js';

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
  const updateToken = await tokenModel.findOneAndUpdate(
    { userId: isEmailExists._id },
    token,
    { new: true }
  );
  // console.log(updateToken);
  if (!updateToken) {
    await tokenModel.create({ token, userId: isEmailExists._id });
  }
  return res.status(200).json({ message: 'User login successfully', token });
};
//get User Profile************************************************
const getUserProfile = async (req, res) => {
  //req.user come from auth.middleware
  res.status(200).json({ message: 'User profile', data: req.user });
};

export { signUpHandler, signInHandler, getUserProfile };

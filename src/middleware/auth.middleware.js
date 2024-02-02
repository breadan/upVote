import jwt from 'jsonwebtoken';
import { userModel } from '../../models/user.model.js';
import tokenModel from '../../models/token.model.js';

const auth = async (req, res, next) => {
  try {
    let { token } = req.headers;
    if (!token || !token.startsWith(process.env.TOKEN_ACCESS)) {
      return next(new Error(`Unauthorized`, { cause: 403 }));
    }
    token = token.split(process.env.TOKEN_ACCESS)[1];
    const tokenDB = await tokenModel.findOne({ token, isValid: true });
    if (!tokenDB) {
      return next(new Error(`Unauthorized`, { cause: 403 }));
    }
    const info = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(info);
    const findUser = await userModel.findById(info._id);
    req.user = findUser;
    return next();
  } catch (err) {
    return next(new Error(`Unauthorized`, { cause: 403 }));
  }
};

export default auth;

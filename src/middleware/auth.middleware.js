import jwt from 'jsonwebtoken';
import { userModel } from '../../models/user.model.js';
import tokenModel from '../../models/token.model.js';

const auth = async (req, res, next) => {
  try {
    let { token } = req.headers;
    if (!token || !token.startsWith(process.env.TOKEN_ACCESS)) {
      return next(new Error(`Unauthorized1`, { cause: 403 }));
    }
    token = token.split(process.env.TOKEN_ACCESS)[1];
    // console.log(token);
    const tokenDB = await tokenModel.findOne({ token, isValid: true });
    if (!tokenDB) {
      return next(new Error(`Unauthorized2`, { cause: 403 }));
    }

    const info = jwt.verify(token, process.env.JWT_SECRET);
    console.log(info);
    if (!info || !info._id) {
      //|| !info.id
      return next(new Error(`Invalid Token Payload`, { cause: 400 }));
    }
    const findUser = await userModel.findById(info._id);
    req.user = findUser;
    return next();
  } catch (err) {
    return next(new Error(`Unauthorized3`, { cause: 500 }));
  }
};

export default auth;

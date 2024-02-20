import jwt from 'jsonwebtoken';
import tokenModel from '../models/token.model.js';

setInterval(() => {
  console.log('hello');
  console.log('The answer to life, the universe, and everything!');
  let { token } = req.headers;
  token = token.split(process.env.TOKEN_ACCESS)[1];
  const info = jwt.verify(token, process.env.JWT_SECRET);
  console.log(info);
  if (!info || !info._id) {
    let data = tokenModel.findByIdAndDelete(info.id);
    console.log(info.id);
    return next(new Error(`Invalid Token Payload`, { cause: 400 }));
  }
}, 2000);

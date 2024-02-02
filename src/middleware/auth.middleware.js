import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { userModel } from '../../models/user.model.js';

// const auth = (req, res, next) => {
//   const accessToken = req.cookies.token;
//   if (!accessToken) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };

const auth = () => {
  return async (req, res, next) => {
    try {
      const accessToken = req.headers;
      if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized1' });
      }
      const firstValue = Object.values(accessToken)[0];
      console.log(firstValue); //token

      jwt.verify(firstValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized3' });
        }
        req.decoded = decoded;
        console.log(req.decoded);

        if (!decoded || !decoded._id) {
          return res.status(403).json({ message: 'invalid_id' });
        }
        //check user credentials
        const findUser = userModel.findById(req.decoded._id);
        if (!findUser) {
          return res
            .status(404)
            .json({ message: 'Unauthorized Please SignUp First' });
        }
        //to transfer data to project
        req.authUser = findUser;
        // const userData = req.authUser.toString();
        console.log(typeof req.authUser);
        // console.log('userData', userData);
        next();
      });
    } catch (error) {
      next(res.status(500).json({ message: 'Unauthorized2' }));
    }
  };
};

export default auth;

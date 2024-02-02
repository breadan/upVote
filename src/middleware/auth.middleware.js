import jwt from 'jsonwebtoken';

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
  return (req, res, next) => {
    const accessToken = req.headers;
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized1' });
    }
    console.log(Object.values(accessToken));
    console.log(typeof accessToken);
    // const convertAccess = accessToken.toString();
    // console.log(typeof convertAccess);
    console.log(accessToken);

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized3' });
      }
      req.decoded = decoded;
      next();
    });
  };
};

export default auth;

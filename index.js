import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/connection.js';
import userRouter from './src/routes/user.rout.js';
import productRouter from './src/routes/product.route.js';
import likeRouter from './src/routes/like.route.js';
import commentRouter from './src/routes/comment.route.js';
import schedule from 'node-schedule';
import tokenModel from './models/token.model.js';

const job = schedule.scheduleJob('42 * * * *', async function () {
  console.log('The answer to life, the universe, and everything!');
  // await tokenModel.deleteMany();
  console.log(
    await tokenModel.deleteMany({
      expireAt: {
        $lte: new Date(),
      },
    })
  );
});

// const timer = async function (req, res, next) {
//   console.log('hello');
//   console.log('The answer to life, the universe, and everything!');
//   const { isValid } = tokenModel;
//   const token = await tokenModel.find({ isValid });
//   let tokensArr = [];
//   tokensArr.push(token);
//   console.log(tokensArr);
// };
// setInterval(() => {
//   // timer();
// }, 2000);
const port = process.env.PORT || 7000;
const mode = process.env.NODE_ENV;

//secure 2
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use(userRouter);
app.use(productRouter);
app.use(likeRouter);
app.use(commentRouter);

//error handling
app.all('*', (req, res, next) => {
  return next(new Error(`page Not Found: ${req.url}`, { cause: 404 }));
});

//global error handling routes
app.use((err, req, res, next) => {
  const statusCode = err.cause || 500;
  return res.status(statusCode).json({ message: err.message });
});
app.get('/', (req, res) => res.send(' World!'));

app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});

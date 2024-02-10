import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/connection.js';
import userRouter from './src/routes/user.rout.js';
import productRouter from './src/routes/product.route.js';

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

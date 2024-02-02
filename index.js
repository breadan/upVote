import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import './config/connection.js';
import userRouter from './src/routes/user.rout.js';
const port = process.env.PORT || 7000;
const mode = process.env.NODE_ENV;
//secure 2
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(userRouter);

app.get('/', (req, res) => res.send(' World!'));

app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});

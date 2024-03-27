import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { addReply } from '../modules/reply/reply.controller.js';
import expressAsyncHandler from 'express-async-handler';

const replyRouter = express.Router();

replyRouter.post('/:replyOnId', auth(), expressAsyncHandler(addReply));

export default replyRouter;

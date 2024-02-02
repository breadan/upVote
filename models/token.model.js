import { Schema, model } from 'mongoose';

const accessToken = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

const tokenModel = model('token', accessToken);
export default tokenModel;

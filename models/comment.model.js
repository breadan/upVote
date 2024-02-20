import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    addBy: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    numberOfLikes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const commentModel = model('Comment', commentSchema);

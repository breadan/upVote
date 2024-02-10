import { Schema, model } from 'mongoose';

const likesSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likeDoneId: {
      type: Schema.Types.ObjectId,
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      enum: ['Product', 'User', 'Comment', 'Reply'],
    },
  },
  { timestamps: true }
);

export const likesModel = model('Like', likesSchema);

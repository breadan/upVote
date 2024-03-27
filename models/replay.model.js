import { Schema, model } from 'mongoose';

const replaySchema = new Schema(
  {
    content: { type: String, required: true },
    addBy: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfLikes: { type: Number, default: 0, min: 0 },
    replyOnId: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    onModel: { type: String, enum: ['Comment', 'Reply'] },
  },
  { timestamps: true }
);

export const replayModel = model('Replay', replaySchema);

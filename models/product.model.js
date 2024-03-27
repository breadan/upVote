import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 15,
      unique: true,
    },
    caption: {
      type: String,
      default: 'no caption',
    },
    images: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true },
        folderId: { type: String, required: true, unique: true },
      },
    ],
    addBy: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfLikes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const productModel = model('Product', productSchema);

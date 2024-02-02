import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 15,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      min: [4, 'Password must be at least 4 characters'],
      max: [10, 'Password must be at least 10 characters'],
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Invalid gender',
      },
      default: 'male',
    },
    bio: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Invalid role',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      default: 'user',
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const userModel = model('User', userSchema);

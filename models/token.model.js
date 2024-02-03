import { Schema, model } from 'mongoose';

const accessToken = new Schema(
  {
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
  },
  { timestamps: true }
);
accessToken.methods.hasExpired = function () {
  var now = Date.now();
  return now - Date.parse(createDate) > 60000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
};

// accessToken.pre('save', async function (next) {
//   const token = this

//   if (!user.isModified('password')) return next()

//   try {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = bcrypt.hashSync(user.password, salt)
//     user.password = hashedPassword
//     next()
//   } catch (error) {
//     next(error)
//   }
const tokenModel = model('token', accessToken);
export default tokenModel;

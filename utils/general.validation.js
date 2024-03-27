import { Types } from 'mongoose';
import Joi from 'joi';

//2- custom role for objectId Validation
//it run if objectId didn't true
const objectIdValidator = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message('invalid object');
};

const generalRules = {
  headers: Joi.object({
    Breadan_: Joi.string().required,
  }).options({ allowUnknown: true }), //the hide value in
  dbId: Joi.string().custom(objectIdValidator),
};

export { generalRules };

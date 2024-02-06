import Joi from 'joi';

const signUpSchema = {
  body: Joi.object({
    name: Joi.string().required().min(5).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().min(15).max(80),
    gender: Joi.string().valid('male', 'female'),
  }),
};

export default signUpSchema;

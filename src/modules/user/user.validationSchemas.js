import Joi from 'joi';

const signUpSchema = {
  body: Joi.object({
    name: Joi.string().trim().required().min(5).max(20).default('Breadan'),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.string().valid(Joi.ref('password')),
    age: Joi.number().min(15).max(80).integer().positive(),
    gender: Joi.string().valid('male', 'female'),
  })
    //.options({presence: 'required'})
    .with('password', 'confirm_password') //delete required fields
    .with('email', 'password'),
};

export default signUpSchema;

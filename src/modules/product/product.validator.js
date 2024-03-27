import Joi from 'joi';
import { generalRules } from '../../../utils/general.validation.js';

//1- validate like product:
const likeProductSchema = {
  body: Joi.object({
    onModel: Joi.string().required(),
  }),
  params: Joi.object({
    productId: generalRules.dbId.required(),
  }),
  headers: generalRules.headers,
};

export { likeProductSchema };

//u can be used:
// objectId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// objectId: Joi.string().length(24).required()

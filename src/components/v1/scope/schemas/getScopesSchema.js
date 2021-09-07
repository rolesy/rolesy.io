import joi from 'joi';

const getScopesSchema = joi.object({
  page: joi.number().positive().integer().allow(0)
    .required()
    .messages({
      'any.required': 'page is required',
    }),
  limit: joi.number().positive().integer().min(1)
    .required()
    .messages({
      'any.required': 'limit is required',
    }),
  module: joi.string().trim().valid('ACCOUNTS', 'USERS').optional(),
  search: joi.string().trim().optional(),
  order: joi.string().optional(),
});

export default getScopesSchema;

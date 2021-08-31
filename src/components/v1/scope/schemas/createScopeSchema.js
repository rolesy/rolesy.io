import joi from 'joi';

const createScopeSchema = joi.object({
  name: joi.string().trim().uppercase().required()
    .messages({
      'any.required': 'name is required (Upper case)',
    }),
  description: joi.string().trim().max(200).required()
    .messages({
      'any.required': 'description scope is required',
    }),
  module: joi.string().trim().valid('ACCOUNTS', 'USERS').required()
    .messages({
      'any.required': 'description scope is required',
    }),
  active: joi.boolean().required(),
});

export default createScopeSchema;

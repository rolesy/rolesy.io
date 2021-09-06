import joi from 'joi';
import joiObjectid from 'joi-objectid';

const objectId = joiObjectid(joi);

const getScopeByIdSchema = joi.object({
  id: objectId().required()
    .messages({
      'any.required': 'valid scope id is required',
    }),
});

export default getScopeByIdSchema;

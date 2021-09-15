import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const deleteAccountByIdSchema = joi.object({
  id: objectId().required().messages({
    "any.required": "valid account id is required",
  }),
});

export default deleteAccountByIdSchema;

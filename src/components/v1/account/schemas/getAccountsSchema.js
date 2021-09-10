import joi from "joi";

const getAccountsSchema = joi.object({
  page: joi.number().positive().integer().required().messages({
    "any.required": "page is required",
  }),
  limit: joi.number().positive().integer().min(1).required().messages({
    "any.required": "limit is required",
  }),
  search: joi.string().trim().optional(),
  order: joi.string().optional(),
});

export default getAccountsSchema
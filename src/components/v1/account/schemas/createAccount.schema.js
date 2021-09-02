import joi from "joi";

const createAccountSchema = joi.object({
  name: joi.string().trim().uppercase().required().messages({
    "any.required": "name is required (Upper case)",
  }),
  description: joi.string().trim().max(200).required().messages({
    "any.required": "description scope is required",
  }),
  billingInformation: billingInformationSchema.required(),
  contactInformation: contactInformationSchema,
  active: joi.boolean().required(),
});

const contactInformationSchema = joi.object({
  name: joi.string().trim().uppercase().required().messages({
    "any.required": "name is required (Upper case)",
  }),
  phone: string()
    .trim()
    .regex(new RegExp("^[0-9]{10}$"))
    .allow("")
    .required()
    .messages({
      "any required": 'Please provide "bill_contact_phone" property',
    }),
  email: string().trim().required().messages({
    "any required": 'Please provide "bill_contact_email" property',
  }),
});

const billingInformationSchema = joi.object({
  company_name: joi.string().trim().uppercase().required().messages({
    "any.required": "name is required (Upper case)",
  }),
  name: joi.string().trim().uppercase().required().messages({
    "any.required": "name is required (Upper case)",
  }),
  phone: string()
    .trim()
    .regex(new RegExp("^[0-9]{10}$"))
    .allow("")
    .required()
    .messages({
      "any required": 'Please provide "bill_contact_phone" property',
    }),
  email: string().trim().required().messages({
    "any required": 'Please provide "bill_contact_email" property',
  }),
  address: string().trim().required().messages({
    "any required": 'Please provide "bill_contact_email" property',
  }),
  zip_code: string().trim().uppercase().alphanum().max(6).required().messages({
    "any required": 'Please provide "bill_zip_code" property',
  }),
  city: string().trim().required().messages({
    "any required": 'Please provide "bill_city" property',
  }),
  country: string().trim().uppercase().required().messages({
    "any required": 'Please provide "bill_country" property',
  }),
  state: string()
    .trim()
    .regex(new RegExp("^[A-Z]{2}$"))
    .uppercase()
    .required()
    .messages({
      "any required": 'Please provide "bill_state" property',
    }),
});

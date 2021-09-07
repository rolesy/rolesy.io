import joi from 'joi';

const contactInformationSchema = joi.object().keys({
  name: joi.string().trim().uppercase().required()
    .messages({
      'any.required': 'name is required (Upper case)',
    }),
  phone: joi
    .string()
    .trim()
    .regex(new RegExp('^[0-9]{10}$'))
    .allow('')
    .required()
    .messages({
      'any required': 'Please provide "bill_contact_phone" property',
    }),
  email: joi.string().trim().required().messages({
    'any required': 'Please provide "bill_contact_email" property',
  }),
});

const billingInformationSchema = joi.object().keys({
  companyName: joi.string().trim().uppercase().required()
    .messages({
      'any.required': 'Bill companyName is required (Upper case)',
    }),
  name: joi.string().trim().uppercase().required()
    .messages({
      'any.required': 'Bill name is required (Upper case)',
    }),
  phone: joi
    .string()
    .trim()
    .regex(new RegExp('^[0-9]{10}$'))
    .allow('')
    .required()
    .messages({
      'any required': 'Please provide "bill_contact_phone" property',
    }),
  email: joi.string().trim().required().messages({
    'any required': 'Please provide "bill_contact_email" property',
  }),
  address: joi.string().trim().required().messages({
    'any required': 'Please provide "bill_contact_email" property',
  }),
  zipCode: joi
    .string()
    .trim()
    .uppercase()
    .alphanum()
    .max(6)
    .required()
    .messages({
      'any required': 'Please provide "bill_zip_code" property',
    }),
  city: joi.string().trim().required().messages({
    'any required': 'Please provide "bill_city" property',
  }),
  country: joi.string().trim().uppercase().required()
    .messages({
      'any required': 'Please provide "bill_country" property',
    }),
  state: joi
    .string()
    .trim()
    .regex(new RegExp('^[A-Z]{2}$'))
    .uppercase()
    .required()
    .messages({
      'any required': 'Please provide "bill_state" property',
    }),
});

const createAccountSchema = joi.object({
  name: joi.string().trim().uppercase().required()
    .messages({
      'any.required': 'name is required (Upper case)',
    }),
  description: joi.string().trim().max(200).required()
    .messages({
      'any.required': 'description scope is required',
    }),
  billingInformation: billingInformationSchema.required(),
  contactInformation: contactInformationSchema.required(),
  active: joi.boolean().required(),
});

export default createAccountSchema;

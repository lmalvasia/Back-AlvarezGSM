const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req["params"][name] }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["params"]) {
          req.value["params"] = {};
        }
        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["body"]) {
          req.value["body"] = {};
        }
        req.value["body"] = result.value;
        next();
      }
    };
  },
  schemas: {
    customerSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      street: Joi.string().required(),
      cellphone: Joi.number()
        .integer()
        .required()
    }),
    customerOptionalSchema: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      street: Joi.string(),
      cellphone: Joi.number().integer()
    }),
    providerSchema: Joi.object().keys({
      company: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      street: Joi.string().required(),
      cellphone: Joi.number()
        .integer()
        .required()
    }),
    providerOptionalSchema: Joi.object().keys({
      company: Joi.string(),
      email: Joi.string().email(),
      street: Joi.string(),
      cellphone: Joi.number().integer()
    }),
    itemSchema: Joi.object().keys({
      description: Joi.string().required(),
      quantity: Joi.number()
        .integer()
        .required(),
      price: Joi.number().required()
    }),
    itemOptionalSchema: Joi.object().keys({
      description: Joi.string(),
      quantity: Joi.number().integer(),
      price: Joi.number()
    }),
    purchaseSchema: Joi.object().keys({
      purchase_number: Joi.string().required(),
      provider: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),
    purchaseOptionalSchema: Joi.object().keys({
      purchase_number: Joi.string(),
      provider: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),
    purchase_productSchema: Joi.object().keys({
      prodcut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      quantity: Joi.number()
        .integer()
        .required(),
      price: Joi.number().required(),
      purchase: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    })
  }
};

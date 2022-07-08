const { Joi } = require("express-validation");

const createUserSchema = {
  body: Joi.object({
    user_name: Joi.string().required(),
    usre_mail: Joi.string().email().required(),
    user_password: Joi.string().required()
  }),
};

module.exports = createUserSchema;

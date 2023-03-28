const validator = require("validator");

const joi = require("joi");

const emailValidation = (email) => {
  const result = validator.isEmail(email);
  if (!result) throw new Error(`"inValid email Id"`);
  return email;
};

const loginValidationSchema = joi.object().keys({
  email: joi.string().required().custom(emailValidation, "email validation"),

  password: joi.string().required(),
});

const registerValidationSchema = joi.object().keys({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().required().custom(emailValidation, "email validation"),
  password: joi.string().required(),
});

module.exports = {
  loginValidationSchema,
  registerValidationSchema,
};

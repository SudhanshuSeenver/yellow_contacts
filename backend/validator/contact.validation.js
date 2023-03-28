const joi = require("joi");
const { userModel } = require("../model");

const contactSchema = joi.object().keys({
  name: joi.string().min(3).max(30).required(),
  country_code: joi.number().greater(0).required(),
  phone_number: joi.number().required(),
});

const numberAlreadyPresent = async (number, user_id) => {
  const user = await userModel.findById(user_id);
  const cont_num = user.contact_list.find((contact) => {
    return String(contact.phone_number) === number;
  });
  if (cont_num) return true;
  return false;
};

module.exports = { contactSchema, numberAlreadyPresent };

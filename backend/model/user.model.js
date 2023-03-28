const mongoose = require("mongoose");
const { contactSchema } = require("./contact.model");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  contact_list: {
    type: [contactSchema],
  },
},
{timestamps: true}
);

module.exports.userModel = mongoose.model("user", userSchema);

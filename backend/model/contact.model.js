const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    country_code: {
      type: Number,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  contactModel: mongoose.model("contact", contactSchema),
  contactSchema,
};

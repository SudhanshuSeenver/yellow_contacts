const express = require("express");
const { getAllContacts } = require("../../controllers/contact.controller");
const { tokenVerification } = require("../../middleware/auth");
const { validUserId, uniqueNumber } = require("../../middleware/contact");
const validateSchema = require("../../middleware/validate");
const { contactSchema } = require("../../validator/contact.validation");

const router = express.Router();
const { createContact, deleteContact, updateContact } =
  require("../../controllers").contactController;

// router.get("/user/:user_id/contact", getAllContacts);
// post request with id and token
// body --> { name countrycode number}
router.use("/:user_id", validUserId, tokenVerification);
router.get("/:user_id", getAllContacts);
router.post(
  "/:user_id",
  validateSchema(contactSchema),
  uniqueNumber,
  createContact
);
router.patch("/:user_id", uniqueNumber, updateContact);
router.delete("/:user_id", deleteContact);

module.exports = router;

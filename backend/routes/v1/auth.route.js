const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../../controllers/auth.controller");
const { uniqueEmail } = require("../../middleware/auth");
const validateSchema = require("../../middleware/validate");

const {
  loginValidationSchema,
  registerValidationSchema,
} = require("../../validator/auth.validation");

router.post(
  "/register",
  validateSchema(registerValidationSchema),
  uniqueEmail,
  registerUser
);
router.post("/login", validateSchema(loginValidationSchema), loginUser);

module.exports = router;

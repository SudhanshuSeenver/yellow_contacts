const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");
const { tokenVerification } = require("../../middleware/auth");

const contactRoutes = require("./contact.route");

router.get("/getUser", tokenVerification, userController.getUser);

router.use("/contacts", contactRoutes);

module.exports = router;

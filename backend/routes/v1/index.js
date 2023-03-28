const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const contactRoutes = require("./contact.route");

router.use("/auth", authRoutes);

router.use("/user", userRoutes);
// router.use("/user", userRoutes);

module.exports = router;

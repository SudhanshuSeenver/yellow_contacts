const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/v1");

// router.use("/user", userRoutes);
// router.use("/auth", authRoutes);
app.use(cors());
app.use(express.json());
app.use("/v1", routes);

app.use((req, res, next) => {
  console.log(req.params);
  res.send("wrong wroute");
});

module.exports = app;

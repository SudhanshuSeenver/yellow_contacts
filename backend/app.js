const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/v1");

// router.use("/user", userRoutes);
// router.use("/auth", authRoutes);
// app.options();
// app.use(cors());
app.options("*", cors());
app.use(
  cors({
    origin: "https://yellow-contacts.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);

app.use(express.json());
app.use("/v1", routes);

app.use((req, res, next) => {
  console.log(req.params);
  res.send("wrong wroute");
});

module.exports = app;

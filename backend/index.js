require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI = process.env.LOCAL_MONGODB_URI;
const server = app;

server.listen(PORT, () => console.log(`listening at PORT ${PORT}`));

mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log(`Connected to DB at ${MONGODB_URI}`))
  .catch((e) => console.log("Failed connect to DB", e));

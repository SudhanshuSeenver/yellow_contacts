const jwt = require("jsonwebtoken");
require("dotenv");

const generateTokens = (
  userId,
  type,
  expiry = 5 * 60,
  secret = process.env.secret_key
) => {
  return jwt.sign({ userId, type }, secret, { expiresIn: expiry });
};

const generateAuthTokens = async (user) => {
  const type = "access";
  //   delayBy = 60*60
  //   Utc = 330 * 60

  const expiry = Math.floor(Date.now() / 1000 + 5 * 60);

  const token = {};
  token[type] = {
    token: generateTokens(user["_id"].toString(), type, expiry),
    expires: new Date(expiry * 1000).toLocaleString("en-IN"),
  };

  return token;
};

const verifyTokens = async (token, secret = process.env.secret_key) => {
  const verify = jwt.verify(token, secret);
  // console.log(verify);
  return verify;
};

module.exports = {
  generateAuthTokens,
  verifyTokens,
};

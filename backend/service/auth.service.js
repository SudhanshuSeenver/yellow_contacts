const bcrypt = require("bcrypt");

async function cryptIt(password) {
  const hashedPw = await bcrypt.hash(password, 15);
  return hashedPw;
}

async function checkPassword(inputPassword, userPassword) {
  const passwordMatch = await bcrypt.compare(inputPassword, userPassword);
  return passwordMatch;
}

module.exports = {
  cryptIt,
  checkPassword,
};

const { userModel } = require("../model");

async function createUser(body) {
  const user = new userModel(body);
  const result = await user.save();
  return result;
}

async function getUserById(user_id) {
  const user = await userModel.findById(user_id);
  return user;
}

async function getUserByEmail(email) {
  const user = await userModel.findOne({ email });

  return user;
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};

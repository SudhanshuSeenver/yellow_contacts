const { userService } = require("../service");
// console.log(userService);
const getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userService.getUserById(id);
    const resData = {
      name: user.name,
      id: user._id,
      contacts: user.contact_list,
    };
    res.status(200).json(resData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getUserByEmail = async (req, res) => {
  //
};

module.exports = {
  getUser,
  getUserByEmail,
};

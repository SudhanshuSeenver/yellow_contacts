const { authService, userService, tokenService } = require("../service");

const registerUser = async (req, res) => {
  try {
    const body = req.body;
    body.password = await authService.cryptIt(body.password);
    const user = await userService.createUser(body);
    const token = await tokenService.generateAuthTokens(user);
    const resData = {
      name: user.name,
      id: user._id,

      contacts: user.contact_list,
      token,
    };
    res.status(201).json(resData);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};
const loginUser = async (req, res) => {
  try {
    
    const body = req.body;
    const user = await userService.getUserByEmail(body.email);
    if (user.length === 0) res.status(404).json({ message: "User Not Found" });

    const chechCredentials = await authService.checkPassword(
      body.password,
      user.password
    );

    if (!chechCredentials)
      return res.status(404).json({ message: "invalid password" });
    const token = await tokenService.generateAuthTokens(user);
    const resData = {
      name: user.name,
      id: user._id,

      contacts: user.contact_list,
      token,
    };

    return res.status(201).json(resData);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

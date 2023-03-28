const { userService, tokenService } = require("../service");

async function uniqueEmail(req, res, next) {
  try {
    const body = req.body;

    const user = await userService.getUserByEmail(body.email);

    if (!user) next();
    else
      return res
        .status(400)
        .json({ message: "User Already registered with this email Id" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
}

async function tokenVerification(req, res, next) {
  try {
    const { token } = req.headers;
    const validatingToken = await tokenService.verifyTokens(token);
    // console.log(temp);
    req.userId = validatingToken.userId 
    next();
  } catch (err) {
    // console.log(err);
    res.status(403).json({ message: "UnAuthorized Access", err });
  }
}

module.exports = { uniqueEmail, tokenVerification };

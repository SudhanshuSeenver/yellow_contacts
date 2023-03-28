const { userModel } = require("../model");
const { numberAlreadyPresent } = require("../validator/contact.validation");
const ObjectId = require("mongoose").Types.ObjectId;

const validUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!ObjectId.isValid(user_id))
      return res.status(404).json({ message: "mongoId is not a valid Id" });

    const user = await userModel.findById(user_id);

    if (user) next();
    else res.status(404).json({ message: "user not found by this id" });
  } catch (err) {
    console.log(err);
    res.json({ mesagge: "error at validUserID" });
  }
};

const uniqueNumber = async (req, res, next) => {
  try {
    const body = req.body;
    const phone_number = body.phone_number || body.data.phone_number;
    const { user_id } = req.params;
    const result = await numberAlreadyPresent(phone_number, user_id);

    if (!result) next();
    else res.status(400).json({ message: "number Already exists" });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { validUserId, uniqueNumber };

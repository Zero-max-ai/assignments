// validation of user for accessing private routes
const { User } = require("../db");
const bcrypt = require("bcryptjs");

const userExistanceValidation = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const userExists = await User.findOne({ username: username });
  // user not found
  if (!userExists) {
    return res
      .status(401)
      .json({ message: "User not found! Please try signing up!" });
  }
  req.user = userExists;
  next();
};

const userPasswordValidation = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.compareSync(password, req.user.password);
  if (!hashedPassword) {
    return res
      .status(403)
      .json({ message: "wrong credential please try again!" });
  }
  next();
};

module.exports = {
  userExistanceValidation,
  userPasswordValidation
};

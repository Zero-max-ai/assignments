const { User } = require("../db");
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .json({ message: "forbidden access! you are not user" });
  }
  const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
  const userExists = await User.findOne({ username: decoded.username });
  if (!userExists) {
    return res.status(400).json({ message: "you are not the user" });
  }
  req.user = userExists;
  next();
}

module.exports = userMiddleware;

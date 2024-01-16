const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const userToken = req.headers.authorization;
  const userData = jwt.verify(userToken, process.env.JWT_PASSWORD);
  const userExists = await Admin.findOne({ username: userData.username });
  if (!userExists) {
    return res.status(403).json({ messaeg: "forbidden access" });
  }
  next();
}

module.exports = adminMiddleware;

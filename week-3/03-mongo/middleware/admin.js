// Middleware for handling auth
const { Admin } = require("../db");
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers["username"];
  const password = req.headers["password"];
  const userExists = await Admin.findOne({ username });
  if (!userExists) {
    return res.status(403).json("You're not the admin.");
  }
  next();
}

module.exports = adminMiddleware;

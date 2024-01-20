const express = require("express");
const router = express.Router();
const { User, Todo } = require("../db");
const bcrypt = require("bcryptjs");
const { jwtSignup, jwtVerify } = require("../middleware/jwt.js");
const {
  userExistanceValidation,
  userPasswordValidation,
} = require("../middleware/userMiddleware.js");

// login route
// @desc - public route
// @request - port return-json
router.post(
  "/login",
  userExistanceValidation,
  userPasswordValidation,
  async (req, res) => {
    const { username, email } = req.body;
    // user JWT(Cookie) Data
    const userCookieData = jwtSignup({
      username,
      email,
      password: req.user.hashedPassword,
    });
    res.cookie("USER_JWT_COOKIE", userCookieData, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });
    res.status(200).json({ message: req.user });
  }
);

// signup router
// @desc - public route
// @request - post no-return
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "user already exists! try login" });
  }
  const salt = bcrypt.genSaltSync(process.env.salt);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  if (!user) {
    return res
      .status(500)
      .json({ message: "Internal server error! please try again" });
  }
  return res.status(201).json({ message: "user created, please try login!" });
});

// get all user todos
// @desc - private route
// @request - get no-return
router.get("/getTodos", userExistanceValidation, async (req, res) => {
  const user = req.user.todo;
  res.status(200).json({ message: user });
});

// add new todo
// @desc - private route
// @request - post no-return
router.post("/addTodo", userExistanceValidation, async (req, res) => {
  const { title } = req.body;
  const token = req.cookies.USER_JWT_COOKIE;
  const isUser = jwtVerify(token);
  if (!isUser) {
    return res.status(403).json({ message: "please enter new " });
  }
  const createNewTodo = await Todo.create({ title });
  const user = req.user;
  const upadatedUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { $push: { todo: createNewTodo } },
    { new: true }
  );
  res.status(201).json({ message: "todo successfully added" });
});

// update specific user todo
// @desc - private route
// @request - post no-return
router.put("/updateTodo/:todoId", async (req, res) => {});

// delete specific user todo
// @desc - private route
// @request - post no-return
router.delete(
  "/deleteTodo/:todoId",
  userExistanceValidation,
  async (req, res) => {}
);

module.exports = router;

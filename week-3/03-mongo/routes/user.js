const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "please fill all fields",
    });
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(401).json({ message: "this user already exists in db" });
  }
  const newUser = await User.create({ username, password });
  if (!newUser) {
    return res.status(400).json({
      message: "server problem occured!",
    });
  }
  res.status(201).json({
    message: "user created!",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const username = req.headers["username"];
  const password = req.headers["password"];
  const allCourses = await Course.find({});
  if (!allCourses) {
    return res
      .status(200)
      .json({ messgae: "soory, no courses avaialbe right now!" });
  }
  return res.status(200).json({ allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const aboutUser = req.aboutUser;
  const courseId = req.params.courseId;
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    return res.status(404).json({
      message: "course not found!",
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    aboutUser["_id"],
    { $push: { purchasedCourses: courseId } },
    { new: true }
  );
  console.log(updatedUser)
  res.status(201).json({ message: "course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers["username"];
  const password = req.headers["password"];
  const userExists = await User.findOne({ username });
  if (!userExists) {
    return res
      .status(403)
      .json({ message: "forbidden, create an account to get courses" });
  }
  return res.status(200).json(userExists["purchasedCourses"]);
});

module.exports = router;

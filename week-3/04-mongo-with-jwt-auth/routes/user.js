const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }
  const user = await User.create({ username, password });
  if (!user) {
    return res.status(500).json({ message: "server error! please try again!" });
  }
  return res.status(201).json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const userExists = await User.findOne({ username });
  if (!userExists) {
    return res.status.json({
      message: "you are not user! please create your account!",
    });
  }
  const userToken = jwt.sign({ username, password }, process.env.JWT_PASSWORD);
  return res.status(200).json({ message: userToken });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  return res.status(200).json({ message: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const user = req.user;
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(400).json({ message: "course does not exists" });
  }
  console.log(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $push: { purchasedCourses: courseId } },
    { new: true }
  );
  res.status(200).json({ message: updatedUser });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const user = req.user;
  res.status(200).json({ message: user.purchasedCourses });
});

module.exports = router;

const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "please fill all fields",
    });
  }
  const userToken = jwt.sign({ username, password }, process.env.JWT_PASSWORD);
  if (!userToken) {
    return res.status(500).json({ message: "server error please try again!" });
  }
  const user = await Admin.create({ username, password });
  if (!user) {
    return res.status(500).json({ message: "server error please try again!" });
  }
  res.status(201).json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "please fill all fields",
    });
  }
  const userToken = jwt.sign({ username, password }, process.env.JWT_PASSWORD);
  const decoded = jwt.verify(userToken, process.env.JWT_PASSWORD);
  const userExists = Admin.findOne({ username });
  if (!userExists) {
    return res
      .status(404)
      .json({ message: "user not found! please try signup" });
  }
  res.status(200).json({ message: userToken });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  if (!title || !description || !price || !imageLink) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const courseVerification = await Course.findOne({ title });
  if (courseVerification) {
    return res.status(400).json({
      message: "this title course already exists",
    });
  }
  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });
  if (!newCourse) {
    return res.status(500).json({
      message: "server error! please try again!",
    });
  }
  res.status(201).json({ message: "new course created!" });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  return res.status(200).json(allCourses);
});

module.exports = router;

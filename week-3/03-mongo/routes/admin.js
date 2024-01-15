const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ msg: "Fill all fields" });
  }
  const userExists = await Admin.findOne({ username });
  if (userExists) {
    return res.status(401).json({ message: "Admin already exists" });
  }
  const user = await Admin.create({ username, password });
  if (!user) {
    return res.status(500).json({ message: "Admin already exists" });
  }
  return res.status(201).json({ message: "Admin created successfully." });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  const newCourse = await Course.findOne({ title });
  if (newCourse) {
    return res.status(400).json({
      message: "this course already exists!",
    });
  }
  const createCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });
  if (!createCourse) { return res.status(500).json({message: 'server error!'}) }
  return res.status(201).json({ message: 'course created!' })
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  if (!allCourses) { return res.status(200).json({message: 'no course created'}) }
  res.status(200).send(allCourses)
});

module.exports = router;

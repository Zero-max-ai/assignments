const express = require("express");
const { dbConnect } = require("./db");
const cookieParser = require("cookie-parser");
const port = 4000;
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
dbConnect();

app.use("/users", require("./routes/userRoutes.js"));

app.get("/", (req, res) => {
  res.status(200).send("working");
});

app.listen(port, () => console.log(`server is listening on port: ${port}`));

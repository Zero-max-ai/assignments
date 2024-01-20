const jwt = require("jsonwebtoken");

const jwtSignup = (username, email, hashedPassword) => {
  try {
    const user = jwt.sign(
      { username, hashedPassword, email },
      process.env.JWT_PASSWORD
    );
    if (!user) {
      return res.status(403).json({ message: "please try signup again!" });
    }
    return user;
  } catch (err) {
    console.log("JWT SignUP Error Occured: " + err.stack);
    return res
      .status(500)
      .json({ message: "Internal Error Occurred, please try again!" });
  }
};

const jwtVerify = (token) => {
  try {
    const validToken = jwt.verify(token, process.env.JWT_PASSWORD);
    if (!validToken) {
      return res.status(403).json({ message: "please try login again!" });
    }
    return true;
  } catch (err) {
    if (err.stack === 'jwt must be provided') {
      return res.status(400).json({message: 'please try login again!'})
    }
    console.log("JWT VERIFICATION ERROR" + err.stack);
    return res
      .status(500)
      .json({ message: "Interal Error Occurred, please try again!" });
  }
};

module.exports = {
  jwtSignup,
  jwtVerify,
};

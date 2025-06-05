const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
    // res.status(201).json({ message: "Authorised." });
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed." });
  }
};

module.exports = { protect };

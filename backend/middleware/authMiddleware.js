const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const protect = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "Not authenticated" });

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(user.id).select("-password");
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from Bearer header
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      // Extract token from cookies
      token = req.cookies.token;
    }

    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorised, token failed!" });
  }
};
module.exports = { protect };

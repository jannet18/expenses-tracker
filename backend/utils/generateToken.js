const jwt = require("jsonwebtoken");

/**
 * Creates a signed JWT and sets it as an HTTP-only cookie,
 * then returns the token (optional, for unit tests or logging).
 */
// const generateTokenAndSetCookie = (res, userId) => {
//   if (!process.env.JWT_SECRET_KEY) {
//     throw new Error("JWT_SECRET_KEY is not set in .env");
//   }

//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "30d",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production" ? true : false,
//     sameSite: "Lax",
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });

//   return token;
//   // return res.status(201).json({ message: "User registered successfully!" });
// };

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;

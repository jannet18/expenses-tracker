const User = require("../models/User");
const generateTokenAndSetCookie = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //  validation:check for empty fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // create user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    console.log(user);
    generateTokenAndSetCookie(res, user._id);
    return res.status(201).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateTokenAndSetCookie(res, user._id);
    return res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

// const getUserInfo = async (req, res) => {
//   res.json(req.user);
// };

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged Out." });
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // console.log("Sending 200 with user data");
    return res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    if (!res.headerSent) {
      return res
        .status(500)
        .json({ message: "Error finding user.", error: error.message });
    }
  }
};
module.exports = { registerUser, loginUser, getUserInfo, logoutUser };

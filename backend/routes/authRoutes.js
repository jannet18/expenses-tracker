const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  logoutUser,
} = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getUser", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
  console.log(req.file);

  if (!req.file || !req.file.path) {
    return res.status(404).json({ message: "No file uploaded." });
  }

  res
    .status(200)
    .json({ message: "Upload successful", imageUrl: req.file.path });
});

module.exports = router;

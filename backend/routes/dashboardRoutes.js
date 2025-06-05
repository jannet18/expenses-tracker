const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const getDashboardData = require("../controllers/getDashboardData");
const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;

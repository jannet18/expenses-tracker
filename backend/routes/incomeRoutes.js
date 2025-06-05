const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addIncome,
  getAllIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/addIncome", protect, addIncome);
router.get("/getIncome", protect, getAllIncome);
router.get("/downloadExcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/addExpense", protect, addExpense);
router.get("/getExpenses", protect, getAllExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;

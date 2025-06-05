const Expense = require("../models/Expense");
const xlsx = require("xlsx");

const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;
    if (!icon || !category || !amount || !date) {
      return res.status(401).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      userId,
      category,
      amount,
      date: Date.now(date),
    });
    newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
    console.log(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const downloadExpenseExcel = async (req, res) => {
  try {
    const expense = await Expense.find(req.user.id).sort({ date: -1 });
    const data = expense.map((item) => ({
      icon: item.icon,
      category: item.category,
      amount: item.amount,
      date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status().json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
};

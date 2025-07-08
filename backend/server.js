require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();

const allowedOrigins = [
  "https://expenses-tracker-haqf.onrender.com",
  "http://localhost:5173",
];

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Catch-all route to serve index.html for SPA
app.use(express.static(path.join(__dirname, "../expense-ui/dist")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../expense-ui/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

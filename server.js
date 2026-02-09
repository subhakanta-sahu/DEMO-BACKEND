require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { pool, connectDB } = require("./db");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // 🔑 REQUIRED
app.use(express.static(__dirname));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Test DB connection before server starts
connectDB();

// GET users
app.get("/api/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM auth_users ORDER BY id DESC");
  res.json(result.rows);
});

// POST user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );

  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/expenses-test", (req, res) => {
  res.send("Expenses route working");
});

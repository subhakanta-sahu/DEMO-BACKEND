const express = require("express");
const router = express.Router();
const { pool } = require("../db");

/**
 * GET all expenses
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * CREATE expense
 */
router.post("/", async (req, res) => {
  try {
    const { amount, details } = req.body;

    const result = await pool.query(
      "INSERT INTO expenses (amount, details) VALUES ($1, $2) RETURNING *",
      [amount, details],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE expense
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, details } = req.body;

    await pool.query("UPDATE expenses SET amount=$1, details=$2 WHERE id=$3", [
      amount,
      details,
      id,
    ]);

    res.json({ message: "Expense updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE expense
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM expenses WHERE id=$1", [id]);

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

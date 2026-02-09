const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const router = express.Router();

/* ----------------------------- REGISTER ----------------------------- */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // check if user exists
    const existing = await pool.query(
      "SELECT id FROM auth_users WHERE email = $1",
      [email],
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO auth_users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------- LOGIN ------------------------------ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, email, password_hash FROM auth_users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "subashchandra",
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

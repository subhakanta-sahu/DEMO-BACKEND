const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, index.js)
app.use(express.static(__dirname));

// Optional CORS
app.use(cors());

// API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Keyboard", price: 80 },
  ]);
});

// No wildcard needed

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

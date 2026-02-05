const express = require("express");
const path = require("path");
const cors = require("cors"); // optional, in case you serve frontend separately

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS if needed (optional for same origin)
app.use(cors());

// Serve all static files (index.html + index.js)
app.use(express.static(__dirname));

// API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Node + Docker + Railway" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Keyboard", price: 80 },
  ]);
});

// Fallback for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

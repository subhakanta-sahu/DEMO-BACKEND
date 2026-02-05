const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Optional CORS (only if frontend is separate)
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

// Optional fallback for SPA (use /* instead of *)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

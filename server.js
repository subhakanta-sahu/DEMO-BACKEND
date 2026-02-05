const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (optional, future-proof)
app.use(express.static(__dirname));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Sample endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "subha" },
    { id: 4, name: "bhanaja" },
  ]);
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 101, name: "Laptop" },
    { id: 102, name: "Keyboard" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

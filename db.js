const { Pool } = require("pg");

// Use environment variables first
// If running Node in Docker, make sure DB_HOST points to the postgres container/service name
const pool = new Pool({
  host: process.env.DB_HOST || "postgres", // container name or service name
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "postgres",
});

module.exports = pool;

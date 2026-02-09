// const { Pool } = require("pg");

// // Use environment variables first
// // If running Node in Docker, make sure DB_HOST points to the postgres container/service name
// const pool = new Pool({
//   host: process.env.DB_HOST || "local", // container name or service name
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//   user: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "secret",
//   database: process.env.DB_NAME || "postgres",
// });

// module.exports = pool;

const { Pool } = require("pg");

/**
 * Create a single shared PostgreSQL pool
 * This pool is reused across the entire app
 */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost", // container name or service name
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "postgres",

  // production-grade settings
  max: 10, // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,

  // Required for Railway / cloud providers
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/**
 * Test DB connection ON SERVER START
 */
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = {
  pool,
  connectDB,
};

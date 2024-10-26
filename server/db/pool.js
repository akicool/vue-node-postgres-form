const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: "localhost",
  password: process.env.POSTGRES_PASSWORD || "root",
  port: "5432",
  database: process.env.POSTGRES_DATABASE || "postgres",
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

module.exports = pool;

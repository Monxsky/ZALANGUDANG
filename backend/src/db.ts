import { Pool } from "pg";

const pool = new Pool({
  user: "admin",       // ganti sesuai .env kamu
  host: "localhost",
  database: "wmszalan",
  password: "admin", // ganti juga
  port: 5432,
});

export default pool;

import { pool } from './config/db';

async function testQuery() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("✅ Test query success:", res.rows[0]);
  } catch (err) {
    console.error("❌ Test query error:", err);
  } finally {
    await pool.end();
  }
}

testQuery();

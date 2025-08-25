import { outboxQueue } from '../jobs/outboxQueue';
import { pool } from '../config/db';

export async function createOutboxEvent(event_type: string, payload: any, warehouse_id?: number) {
  // Masukkan ke tabel outbox
  const res = await pool.query(
    `INSERT INTO outbox (event_type, payload, warehouse_id) VALUES ($1,$2,$3) RETURNING *`,
    [event_type, payload, warehouse_id]
  );
  const event = res.rows[0];

  // Push ke Redis queue dengan retry/backoff
  await outboxQueue.add('process-outbox', event, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 5000 } // 5s -> 10s -> 20s
  });

  return event;
}

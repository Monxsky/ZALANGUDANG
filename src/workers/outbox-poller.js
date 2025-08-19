import { pool } from '../config/db.js';
import { marketplaceQueue } from '../libs/queue.js';

export const pollOutbox = async () => {
    const { rows } = await pool.query(
        `SELECT * FROM outbox_events WHERE status='pending' AND next_run_at <= NOW() LIMIT 10`
    );

    for (const event of rows) {
        await marketplaceQueue.add('update', event, {
            attempts: 5,
            backoff: { type: 'exponential', delay: 2000 }
        });

        await pool.query(`UPDATE outbox_events SET status='processing' WHERE id=$1`, [event.id]);
    }
};

import express from 'express';
import dotenv from 'dotenv';
import { dbHealthCheck } from './config/db.js';
import { pollOutbox } from './workers/outbox-poller.js';
import { saleOrder } from './modules/orders/index.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/db/health', async (req, res) => {
    const ok = await dbHealthCheck();
    res.json({ status: ok ? 'ok' : 'fail' });
});

app.post('/orders/sale', async (req, res) => {
    const { sku, qty } = req.body;
    try {
        await saleOrder(sku, qty);
        res.json({ status: 'ok' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

setInterval(pollOutbox, 5000);

app.listen(3000, () => console.log('Server running on port 3000'));

import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

export const marketplaceQueue = new Queue('marketplace.update', {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

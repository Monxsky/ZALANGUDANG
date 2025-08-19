import { Worker } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

let failureCount = 0;
let circuitOpen = false;
let circuitResetTime = null;
const FAILURE_THRESHOLD = 3;
const OPEN_TIME = 10000; // ms

const processJob = async (job) => {
    if (circuitOpen) {
        if (Date.now() > circuitResetTime) {
            circuitOpen = false;
            failureCount = 0;
        } else {
            throw new Error('Circuit breaker open');
        }
    }

    if (process.env.SIMULATE_FAIL === '1') {
        failureCount++;
        if (failureCount >= FAILURE_THRESHOLD) {
            circuitOpen = true;
            circuitResetTime = Date.now() + OPEN_TIME;
        }
        throw new Error('Simulated failure');
    }

    console.log('Processing marketplace update:', job.data);
};

new Worker('marketplace.update', processJob, {
    connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});

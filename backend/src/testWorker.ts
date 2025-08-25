import { outboxQueue, worker } from './jobs/outboxQueue';

async function testQueue() {
  const job = await outboxQueue.add('test-event', {
    id: 999,
    event_type: 'sale',
    payload: { sku: 'TEST123', qty: 10 },
    warehouse_id: 1
  });

  console.log('✅ Job added with ID:', job.id);

  worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} completed successfully`);
    process.exit(0);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
    process.exit(1);
  });
}

testQueue();

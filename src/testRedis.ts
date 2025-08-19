import connection from './config/redis';

async function testRedis() {
  try {
    await connection.set('test_key', 'hello');
    const value = await connection.get('test_key');
    console.log('✅ Redis connected. test_key =', value);
    process.exit(0);
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
    process.exit(1);
  }
}

testRedis();

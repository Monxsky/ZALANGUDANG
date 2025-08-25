require('dotenv').config(); // kalau pakai env

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'wmszalan',
      port: process.env.DB_PORT || 5432
    },
    migrations: {
      directory: './migrations'
    }
  }
};

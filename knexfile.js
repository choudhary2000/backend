require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_URL,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds'
    },
    pool: { min: 0, max: 4 }
  }
};

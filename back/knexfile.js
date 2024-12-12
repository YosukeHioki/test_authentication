// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  //デフォルト値のため要確認
  // staging: {
  //   client: 'pg',
  //   connection: {
  //     database: process.env.DB_NAME,
  //     user: process.env.DB_USER
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    //デフォルト値、一定数のDB接続をプールして、新しい接続によってパフォーマンスが落ちるのを防ぐ
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

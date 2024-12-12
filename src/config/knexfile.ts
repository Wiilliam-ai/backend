import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "123456",
      database: "fragote_db",
    },
    migrations: {
      directory: "./src/config/migrations",
      extension: "ts",
    },
  },
};

export default config;

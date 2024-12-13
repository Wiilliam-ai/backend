import knex from "knex";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./envs.config";

const database = knex({
  client: "mysql2",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  pool: {
    min: 0,
    max: 7,
  },
});

export default database;

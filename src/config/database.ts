import knex from "knex";

const database = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "fragote_db",
  },
  pool: {
    min: 0,
    max: 7,
  },
});

export default database;

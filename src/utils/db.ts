import knex from 'knex';
const pass = process.env.NEXT_PUBLIC_DB_PASS;
const db = knex({
  client: process.env.NEXT_PUBLIC_DBClient,
  connection: {
    host: process.env.NEXT_PUBLIC_HOSTDB,
    user: process.env.NEXT_PUBLIC_DBUSER,
    port: 3306,
    password: pass,
    database: process.env.NEXT_PUBLIC_DATABASE,
  },
  pool: { min: 0, max: 7 },
});

export default db;

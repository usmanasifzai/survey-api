import { Pool } from 'pg';

const env = process.env.NODE_ENV || 'development';
let database = process.env.PGDATABASE;
if(env === 'test') {
  database = process.env.PGDATABASE_TEST
}

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

export default pool;

import { Pool } from 'pg';

import { Pool } from 'pg';

// Create a connection pool to PostgreSQL
const pool = new Pool({
  user: 'your_database_user',          // Replace with your PostgreSQL username
  host: 'localhost',                   // Replace with your database host (e.g., localhost)
  database: 'your_database_name',      // Replace with your PostgreSQL database name
  password: 'your_database_password',  // Replace with your PostgreSQL password
  port: 5432,                          // Default PostgreSQL port
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connection established');
  }
  release();
});

// Export the pool for use in other files
export default pool;


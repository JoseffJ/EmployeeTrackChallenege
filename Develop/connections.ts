import { Pool } from 'pg';

const pool = new Pool({
    user: 'your_database_user',          
    host: 'localhost',                   
    database: 'your_database_name',      
    password: 'your_database_password',  
    port: 5432,                         
  });

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
    } else {
      console.log('Database connection established');
    }
    release();
  });
  
  
  export default pool;
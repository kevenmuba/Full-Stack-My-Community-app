const mysql = require('mysql2/promise');

const dbConfig = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  connectTimeout: 10000, // Timeout in milliseconds
};

const pool = mysql.createPool(dbConfig);

// Function to check the database connection
async function checkConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Database connection successful:', rows);
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error; // Rethrow error for upstream handling
  }
}

async function query(sql, params = []) {
  console.log('Executing SQL:', sql);
  
  if (params && params.length > 0) {
    const maskedParams = params.map(param => typeof param === 'string' ? '***' : param);
    console.log('With params:', maskedParams);
  } else {
    console.log('No params provided');
  }

  try {
    const [rows, fields] = await pool.execute(sql, params);
    console.log('Query result type:', Array.isArray(rows) ? 'Array' : typeof rows);
    console.log('Number of rows:', Array.isArray(rows) ? rows.length : 'N/A');
    return rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
}

// Export the query function and checkConnection
module.exports = { query, checkConnection };
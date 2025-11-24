import pkg from 'pg'; // Importing pg as a CommonJS module in ES6 syntax
const { Client } = pkg;
import dotenv from 'dotenv'

dotenv.config();

const client = new Client({
  user: process.env.USER,          // PostgreSQL username
  host: process.env.HOST,          // Database server address
  database: process.env.DATABASE,  // Name of the database
  password: process.env.PASSWORD,  // Password for the database user
  port: process.env.DBPORT,        // Default PostgreSQL port
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err));

export { client }; // Exporting the client object

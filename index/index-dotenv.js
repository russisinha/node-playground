require('dotenv').config(); // Load environment variables from a .env file

// Access environment variables to .env
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;

// Validate environment variables
if (!apiKey || !dbUrl) {
  console.error('Environment variables are missing!');
} else {
  console.log('API Key:', apiKey); // Log API key
  console.log('Database URL:', dbUrl); // Log database URL
}
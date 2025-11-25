import { client } from "./config.js";

const setupDatabase = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  try {
    await client.query(createUsersTableQuery);
    console.log('Table "users" created successfully.');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
};

setupDatabase();

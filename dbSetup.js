import { client } from "./config";

const setupDatabase = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
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

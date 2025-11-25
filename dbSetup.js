import { client } from "./config";

const setupDatabase = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending'
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

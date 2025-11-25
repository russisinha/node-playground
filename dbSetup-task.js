import { client } from "./config.js";

const setupDatabase = async () => {
  const createTasksTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending'
    );
  `;

  try {
    await client.query(createTasksTableQuery);
    console.log('Table "tasks" created successfully.');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
};

setupDatabase();

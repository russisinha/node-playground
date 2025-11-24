import { client } from './config.js';

// Insert multiple users
const insertUsers = async (users) => {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';

  try {
    for (const user of users) {
      const result = await client.query(query, [user.name, user.email]);
      console.log('User added:', result.rows[0]);
    }
  } catch (err) {
    console.error('Insert error:', err);
  }
};

// Retrieve all users
const getUsers = async () => {
  const query = 'SELECT * FROM users';

  try {
    const result = await client.query(query);
    console.log('Users:', result.rows);
  } catch (err) {
    console.error('Fetch error:', err);
  }
};

// Update a user
const updateUser = async (id, name) => {
  const query = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *';
  const values = [name, id];

  try {
    const result = await client.query(query, values);
    console.log('User updated:', result.rows[0]);
  } catch (err) {
    console.error('Update error:', err);
  }
};

// Delete a user
const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await client.query(query, values);
    console.log('User deleted:', result.rows[0]);
  } catch (err) {
    console.error('Delete error:', err);
  }
};

// Execute CRUD operations
await insertUsers([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);
await getUsers();
await updateUser(1, 'Alice Updated');
await deleteUser(2);

// Close the database connection
await client.end();
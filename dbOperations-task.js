// Write your code here
import { client } from './config.js';

const addTask = async (title, description) => {
  const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';

  try {
    const result = await client.query(query, [title, description]);
    console.log('Task added:', result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err);
  }
};

const getTasks = async() => {
    const query = 'SELECT * FROM tasks'
    try {
        const result = await client.query(query);
        console.log('Tasks:', result.rows);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

const updateTaskStatus = async(id, status) => {
    const query = 'UPDATE tasks set status = $2 WHERE id = $1 RETURNING *'
    try {
        const result = await client.query(query, [id, status]);
        console.log('Task updated:', result.rows);
    } catch (err) {
        console.error('Update error:', err);
    }
}

const deleteTask = async(id) => {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
    try {
        const result = await client.query(query, [id]);
        console.log('Task deleted:', result.rows);
    } catch (err) {
        console.error('Delete error:', err);
    }
}


// Execute CRUD operations
await addTask('task1', 'task1');
await addTask('task2', 'task2');
await addTask('task3', 'task3');
await getTasks();
await updateTaskStatus(1, 'Completed');
await deleteTask(2);
await getTasks();

// Close the database connection
await client.end();


const express = require('express'); // Importing Express.js to create a server
const app = express(); // Initializing the Express app
const port = 3000; // Defining the server port

// Middleware for logging requests. Middleware runs before endpoints to process incoming requests.
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

// Middleware for parsing JSON in request bodies
app.use(express.json());

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

// Dynamic route to handle user IDs
app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Extracting the user ID from the URL
  res.send(`User ID: ${userId}`);
});

// POST route to accept and respond to JSON data
app.post('/data', (req, res) => {
  const data = req.body; // Accessing the JSON data sent in the request body
  res.json({ message: 'Data received!', data });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
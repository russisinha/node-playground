const http = require('http'); // Import HTTP module
const port = 3000; // Define server port

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  res.end('Hello, Nodemon!'); // Send response
});

// Start the server
server.listen(port, () => {
  console.log(`HTTP Server is live at http://localhost:${port}`);
});
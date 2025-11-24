import http from 'http';
import { addTask, getTasks, getTaskById, updateTaskStatus, deleteTask } from './taskFunctions.js';

const server = http.createServer(async (req, res) => {
    const urlParts = req.url.split('/');
    const id = urlParts[2];

    if (req.method === 'POST' && req.url === '/tasks') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { title, description } = JSON.parse(body);
                if (!title || !description) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({ error: '400: Bad Request - Missing title or description' }));
                }
                const newTask = await addTask(title, description);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(newTask));
            } catch (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: '500: Failed to add task' }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/tasks') {
        try {
            const tasks = await getTasks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks));
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch tasks' }));
        }
    } else if (req.method === 'GET' && urlParts[1] === 'tasks' && id) {
        try {
            const task = await getTaskById(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(task));
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch task' }));
        }
    } else if (req.method === 'PATCH' && urlParts[1] === 'tasks' && id) {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', async () => {
            try {
                const { status } = JSON.parse(body);
                if (!status) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Status is required' }));
                }

                const task = await updateTaskStatus(id, status);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(task));
            } catch {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to update task' }));
            }
        });
    }  else if (req.method === 'DELETE' && urlParts[1] === 'tasks' && id) {
        try {
            const task = await deleteTask(id);
            res.writeHead(204);
            res.end();
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to delete task' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

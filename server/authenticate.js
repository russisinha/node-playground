import http from 'http';
import bcrypt from 'bcrypt';
import { client } from './../config.js';
import jwt from 'jsonwebtoken'

// run dbSetup-user.js

const secretKey = 'my_secret_key';

const server = http.createServer((req, res) => {
    if(req.method == 'POST' && req.url == '/register') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            try {
                let { username, password } = JSON.parse(body)
                const hashedPwd = await bcrypt.hash(password, 5);
                await client.query('INSERT INTO users(username, password) values($1, $2)', [username, hashedPwd])
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end('User registered successfully!')
            } catch(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('User registration failed: ' + err)
            }
        })
    }
    else if(req.method == 'POST' && req.url == '/login') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            try {
                let { username, password } = JSON.parse(body)
                const result = await client.query('SELECT password FROM users WHERE username = $1', [username])
                if (result.rows.length == 0) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' })
                    return res.end('404: User not found!')
                }
                const isMatch = await bcrypt.compare(password, result.rows[0].password)
                if (isMatch) {
                    const token = jwt.sign({ username }, secretKey, {expiresIn: '1h' })
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: 'Login successful!', token }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/plain' })
                    res.end('401: Invalid credentials!')
                }
            } catch(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('500: User login failed: ' + err)
            }
        })
    }
    else if(req.method == 'GET' && req.url == '/profile') {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1]
        if (!token) {
            res.writeHead(401, { 'Content-Type': 'text/plain' })
            return res.end('401: Access denied!')
        }
        jwt.verify(token, secretKey, (err, user)=> {
            if (err) {
                res.writeHead(403, { 'Content-Type': 'text/plain' })
                return res.end('403: Invalid token!')
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end(`Welcome, ${user.username}`)
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404: Not found!')
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

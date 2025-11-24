// Write your code here

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/html' && req.method === 'GET') {
        const data = fs.readFileSync('server/people.json', 'utf8')
        const people = JSON.parse(data).people
        const htmlData = `
        <html>
            <head></head>
            <body>
                <h1>People list</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                    ${people.map(row => `<tr><td>${row.name}</td><td>${row.age}</td></tr>`).join('')}
                </table>
            </body>
        </html
        `
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(htmlData)
    }
    else if (req.url === '/json' && req.method === 'GET') {
        const data = fs.readFileSync('server/people.json', 'utf8')
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(data)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404: page not found')
    }
    res.end()
})

server.listen(3000, () => {
    console.log('Running on http://localhost:3000')
})
// Write your code here

const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/greet' && req.method === 'GET') {
        const queryString = req.url.split('?')[1];
        const params = new URLSearchParams(queryString);
        const name = params.get('name') || 'guest'
        const language = params.get('language') || 'en'

        res.writeHead(200, {'Content-Type': 'text/plain'})
        if (language == 'es') {
            res.write(`Hola, ${name}!`)
        }
        else if (language == 'en') {
            res.write(`Hello, ${name}!`)
        }
        res.end()
    }
    else if (req.url === '/uppercase' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            let bodyObj = JSON.parse(body)

            if('text' in bodyObj) {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ text : bodyObj.text.toUpperCase()}))
            }
            else {
                res.writeHead(400, {'Content-Type': 'text/plain'})
                res.end('400: Bad Request!')
            }
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404: page not found')
    }
})

server.listen(3000, () => {
    console.log('Running on http://localhost:3000')
})
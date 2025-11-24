const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/' && req.method === 'GET') {
        res.write('Home page')
    }
    else if (req.url === '/about' && req.method === 'GET') {
        res.write('About page')
    }
    else if (req.url === '/contact' && req.method === 'GET') {
        res.write('Contact page')
    }
    else {
        res.write('404: page not found')
    }
    res.end()
}).listen(3000, () => {
    console.log('Running on http://localhost:3000')
})
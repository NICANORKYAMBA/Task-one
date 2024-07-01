const http = require('http');
const getVisitorInfo = require('./app');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(async (req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    if (req.method === 'GET' && req.url.startsWith('/api/hello')) {
        try {
            const visitorInfo = await getVisitorInfo(req);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(visitorInfo));
        } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.statusCode = 404;
        res.end('Resource not found!');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
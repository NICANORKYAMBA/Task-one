const http = require('http');
const os = require('os');
const getVisitorInfo = require('./app');

const hostname = os.hostname();
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Welcome to my Node.js App</h1><p>Navigate to <a href="/api/hello?visitor_name=Mark">/api/hello?visitor_name=Mark</a> to see the API in action.</p>');
    } else if (req.method === 'GET' && req.url.startsWith('/api/hello')) {
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
        res.setHeader('Content-Type', 'text/plain');
        res.end('Resource not found!');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
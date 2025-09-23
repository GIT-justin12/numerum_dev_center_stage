const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const pages = ['/','/engineers.html','/savants.html', '/developers.html'];
    let filePath = path.join(__dirname, 'pages', 'index.html');
    if (pages.includes(req.url)) {
        filePath = path.join(__dirname, 'pages', req.url === '/' ? 'index.html' : req.url)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        filePath = path.join(__dirname, 'pages', '/not-found.html');
        fs.readFile(filePath, (err, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

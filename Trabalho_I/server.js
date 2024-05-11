const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(`${method} ${url}`);

    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.end("Trabalho 1 da disciplina Tecnologias Backend");
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.end(`Trabalho 1 da disciplina Tecnologias Backend. Você acessou a rota ${url}`);
    }
});

server.listen(port, hostname, () => {
    console.log(`O servidor está sendo executado em ${hostname}:${port}`);
});
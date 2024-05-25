const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",  
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    woff: "font/woff",
    woff2: "font/woff2", 
};

http.createServer((req, res) => {
    let acesso_uri = url.parse(req.url).pathname;
    let caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri));

    let recurso_carregado;
    try {
        recurso_carregado = fs.lstatSync(caminho_completo_recurso);
    } catch {
        res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.write('404: Arquivo não encontrado!');
        res.end();
        return; 
    }  

    if (recurso_carregado.isFile()) {
        let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)];  

        res.writeHead(200, {'Content-Type': mimeType});
        let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
        fluxo_arquivo.pipe(res);
    } else if (recurso_carregado.isDirectory()) {
        res.writeHead(302, {'Location': 'index.html'});
        res.end();
    } else {
        res.writeHead(500, {'Content-Type': 'text/plain; charset=UTF-8'});
        res.write('500: Erro interno do servidor');
        res.end();
    }
}).listen(port, hostname, () => {
    console.log(`O servidor está sendo executado em http://${hostname}:${port}/`);
});

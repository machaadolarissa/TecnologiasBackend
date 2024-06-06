const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, 'database.sqlite');

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados.');
        db.run(`CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            comentarios TEXT NOT NULL
        )`);
    }
});

module.exports = db;

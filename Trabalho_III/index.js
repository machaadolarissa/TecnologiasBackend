const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const getRoutes = require('./routes/buscar');
const postRoutes = require('./routes/salvar');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});


app.get('/buscar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buscar.html'));
});

app.use('/', getRoutes);
app.use('/', postRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => console.log(`Server executando na porta ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const validarEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Endereço de e-mail inválido');
    }
    next();
};
  

app.get('/', (req, res) => {
  res.redirect('/contato');
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

app.post('/contato', validarEmail, (req, res) => {
    const { nome, email, comentarios } = req.body;
    const sql = `INSERT INTO contatos (nome, email, comentarios) VALUES (?, ?, ?)`;
    db.run(sql, [nome, email, comentarios], (err) => {
      if (err) {
        res.redirect('/falha');
      }
      res.redirect('/sucesso');
    });
  });

app.get('/sucesso', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sucesso.html'));
});

app.get('/falha', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'falha.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

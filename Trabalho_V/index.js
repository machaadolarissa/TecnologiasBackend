const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require('./setup/bd');
mongoose.connect(dbConfig.mongoURL)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
    });

app.use(express.static(path.join(__dirname, 'public')));

const Comment = require('./models/comentario');

const validarEmail = async (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        req.errorMessage = 'Endereço de e-mail inválido';
        return next();
    }
    
    next();
};

app.get('/', (req, res) => {
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/form.html'));
});

app.post('/form', validarEmail, async (req, res) => {
    const { username, email, password, comment } = req.body;

    try {
        let existingComment = await Comment.findOne({ $or: [{ username }, { email }] });
        if (existingComment) {
            return res.status(400).sendFile(path.join(__dirname, 'public/views/data_exists.html'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newComment = new Comment({
            username,
            email,
            password: hashedPassword,
            comment
        });

        await newComment.save();
        return res.status(200).sendFile(path.join(__dirname, 'public/views/success.html'));
    } catch (error) {
        return res.status(500).sendFile(path.join(__dirname, 'public/views/error.html'));
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public/views/not_found.html'));
});

app.use((err, req, res, next) => {
    if (req.errorMessage) {
        return res.status(400).sendFile(path.join(__dirname, 'public/views/form.html'), { errorMessage: req.errorMessage });
    }
    
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/post/salvar_usuario', (req, res) => {
    const db = new sqlite3.Database(path.join(__dirname, '../database/database.sqlite'));
    const name = req.body.name;

    db.run('INSERT INTO users (name) VALUES (?)', [name], function(err) {
        if (err) {
            return res.redirect('/erro.html');
        }

        res.redirect(`/sucesso.html?name=${encodeURIComponent(name)}`);
    });

    db.close();
});

module.exports = router;

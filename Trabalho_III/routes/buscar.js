const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

router.get('/get/user', (req, res) => {
    const db = new sqlite3.Database(path.join(__dirname, '../database/database.sqlite'));
    const name = req.query.name;
    
    if (req.get('User-Agent').includes('Postman')) {
        db.get('SELECT * FROM users WHERE name = ?', [name], function(err, row) {
            if (err || !row) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.json(row); 
        });
    } else {
        db.get('SELECT * FROM users WHERE name = ?', [name], function(err, row) {
            if (err || !row) {
                return res.redirect('/erro.html');
            }

            res.redirect(`/detalhes.html?id=${row.id}&name=${encodeURIComponent(row.name)}`);
        });
    }

    db.close();
});


module.exports = router;

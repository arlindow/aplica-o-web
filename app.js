const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '???????????',
    database: 'bibliotecaMySQL'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Rota principal para exibir o formulário
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para realizar consultas SELECT
app.post('/select', (req, res) => {
    db.query('SELECT * FROM teste', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.send('Error executing query');
        }
        res.render('index', { results });
    });
});

// Rota para inserir dados
app.post('/insert', (req, res) => {
    const data = { nome: req.body.nome, idade: req.body.idade, email: req.body.email };
    db.query('INSERT INTO teste SET ?', data, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.send('Error inserting data');
        }
        res.redirect('/');
    });
});

// Rota para atualizar dados
app.post('/update', (req, res) => {
    const data_update = { nome: req.body.nome };
    db.query('UPDATE teste SET ? WHERE id = ?', [data_update, req.body.id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.send('Error updating data');
        }
        res.redirect('/');
    });
});

// Rota para deletar dados
app.post('/delete', (req, res) => {
    db.query('DELETE FROM teste WHERE id = ?', [req.body.id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.send('Error deleting data');
        }
        res.redirect('/');
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

Claro! Vou organizar os códigos e os passos para iniciar o projeto em um formato de eBook. Aqui está a estrutura para isso:

---

# eBook: Criando uma aplicação web com MySQL, Node.js, Express e EJS

## Introdução
Este eBook guia você na criação de uma aplicação web utilizando Node.js, Express, EJS e MySQL. Você aprenderá a configurar o ambiente de desenvolvimento, conectar-se a um banco de dados MySQL e criar uma interface de usuário para realizar operações CRUD (Create, Read, Update, Delete).

## Capítulo 1: Configuração do Ambiente

### Passo 1: Inicializar o Projeto Node.js
Crie uma nova pasta para o projeto e, em seguida, inicialize o projeto Node.js:
```bash
mkdir biblioteca_mysql_nodejs
cd biblioteca_mysql_nodejs
npm init -y
```

### Passo 2: Instalar Dependências
Instale as dependências necessárias: Express, EJS, Body-Parser e MySQL.
```bash
npm install express ejs body-parser mysql
```

### Arquivo `package.json`
O arquivo `package.json` deve se parecer com isto após a instalação das dependências:
```json
{
  "name": "biblioteca_mysql_nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "mysql": "^2.18.1"
  }
}
```

## Capítulo 2: Conexão ao Banco de Dados MySQL

### Arquivo `connect.js`
Crie um arquivo `connect.js` para gerenciar a conexão ao banco de dados:
```javascript
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '???????????',  // Substitua pela sua senha
    database: 'bibliotecaMySQL'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
```

## Capítulo 3: Configuração do Servidor Express

### Arquivo `app.js`
Crie o arquivo `app.js` para configurar o servidor Express e as rotas:
```javascript
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
    password: '??????????',  // Substitua pela sua senha
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
```

## Capítulo 4: Interface do Usuário com EJS

### Arquivo `views/index.ejs`
Crie o arquivo `index.ejs` na pasta `views` para a interface do usuário:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca MySQL Node.js</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <h1>Biblioteca MySQL Node.js</h1>
        <form action="/select" method="post">
            <button type="submit">Select</button>
        </form>

        <form action="/insert" method="post">
            <h2>Inserir Dados</h2>
            <input type="text" name="nome" placeholder="Nome" required>
            <input type="number" name="idade" placeholder="Idade" required>
            <input type="email" name="email" placeholder="Email" required>
            <button type="submit">Inserir</button>
        </form>

        <form action="/update" method="post">
            <h2>Atualizar Dados</h2>
            <input type="number" name="id" placeholder="ID" required>
            <input type="text" name="nome" placeholder="Nome" required>
            <button type="submit">Atualizar</button>
        </form>

        <form action="/delete" method="post">
            <h2>Deletar Dados</h2>
            <input type="number" name="id" placeholder="ID" required>
            <button type="submit">Deletar</button>
        </form>

        <% if (typeof results !== 'undefined') { %>
        <h2>Resultados da Consulta</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Email</th>
            </tr>
            <% results.forEach(result => { %>
            <tr>
                <td><%= result.id %></td>
                <td><%= result.nome %></td>
                <td><%= result.idade %></td>
                <td><%= result.email %></td>
            </tr>
            <% }); %>
        </table>
        <% } %>
    </div>
</body>
</html>
```

### Arquivo `public/styles.css`
Crie o arquivo `styles.css` na pasta `public` para estilização:
```css
criar estilo
```

## Capítulo 5: Executando a Aplicação
Para iniciar a aplicação, execute o seguinte comando no terminal:
```bash
node app.js
```
Abra o navegador e acesse `http://localhost:3000` para visualizar a interface da aplicação e interagir com o banco de dados MySQL.

---

Com este

 eBook, você terá todos os passos e códigos necessários para criar uma aplicação web completa utilizando Node.js, Express, EJS e MySQL.
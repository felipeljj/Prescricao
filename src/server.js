const express = require('express');
const app = express();
const db = require('./database');
const mysql = require('mysql2')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//pagina inicial, que é a pagina de login
app.get('/', (req, res) => {
  res.sendFile('login.html', {root: './views'})
});

app.get('/receita', (req, res) => {
  res.sendFile('index.html', {root: './views'})
});

app.get('/cadastro', (req, res) => {
  res.sendFile('cadastro.html', {root: './views'})
});



app.post('/cadastro', (req, res) => {
  const { nome, crm, cns, senha } = req.body;
  db.query('INSERT INTO Medico SET ?', {nome, crm, cns, senha}, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.send('Erro ao cadastrar o médico. Por favor, tente novamente.');
    } else {
      console.log(results);
      res.send('Médico cadastrado com sucesso!');
    }
  });
});

app.post('/login', (req, res) => {
  const { crm, senha } = req.body;
  db.query('SELECT * FROM Medico WHERE crm = ? AND senha = ?', [crm, senha], (error, results, fields) => {
    if (error) throw error;
    if (results.length > 0) {
      // O médico está autenticado, redirecione para a página de receitas
      res.redirect('/receita');
    } else {
      // As credenciais estão incorretas, redirecione de volta para a página de login
      res.redirect('/');
    }
  });
});

// serve.js
app.get('/buscar-medicamentos', (req, res) => {
  const termoBusca = req.query.termo;
  // Aqui você faria a busca no banco de dados
  // Por exemplo:
  db.query('SELECT nome, dose, posologia FROM Medicamento WHERE nome LIKE ?', [`%${termoBusca}%`], (error, results) => {
    if (error) {
      res.json({ error: 'Erro ao buscar medicamentos.' });
    } else {
      // Envie os resultados de volta para o cliente
      res.json(results);
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

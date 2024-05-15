const express = require('express');
const app = express();
const db = require('./database');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

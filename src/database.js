//Codigo para linkar o database do MySQL ao site.

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // ou o endereço IP do seu servidor MySQL
  user: 'root', // seu usuário do MySQL
  password: 'FelipeGabi123', // sua senha do MySQL
  database: 'sistema' // o nome do seu banco de dados
});

connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.message);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso!');
});

module.exports = connection;

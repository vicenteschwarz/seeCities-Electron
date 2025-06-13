const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // <- substitua pelo seu usuário do PostgreSQL
  host: 'localhost',
  database: 'seeCities',       // <- substitua pelo nome do seu banco de dados
  password: '123456', //123456      // <- substitua pela senha correta
  port: 5432,                  // porta padrão do PostgreSQL
});


function query(text, params){
    return pool.query(text, params)
}

module.exports = {
  query 
  }

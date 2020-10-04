const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database : 'crudfornecedores',
  port : 3306
});
connection.connect();
module.exports = connection;
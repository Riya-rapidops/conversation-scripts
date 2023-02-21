let mysql = require('mysql2');
const util = require('util');
const config = require('../config/config.json').development;

mysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'salesmate',
  // insecureAuth: true
});


// node native promisify
const mysqlQuery = util.promisify(mysql.query).bind(mysql);

module.exports = mysqlQuery;
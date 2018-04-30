var mysql = require('mysql');
var auth = require('../auth');

var connection = mysql.createConnection({
    host : auth.mysql_host,
    user : auth.mysql_user,
    password : auth.mysql_password,
    database : auth.mysql_database
});
connection.connect();
module.exports = connection;


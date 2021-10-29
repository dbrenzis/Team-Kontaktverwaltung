const mysql = require("mysql");

var connection = mysql.createPool({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "123456",
  database: process.env.DATABASE_DATABASE || 'kontaktverwaltung'
});

module.exports = connection;
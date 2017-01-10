const mysql = require('mysql')

var database = {
  connect: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api'
  })
}

module.exports = database

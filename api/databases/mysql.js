const mysql = require('mysql')

export var database = {
  connect: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_neilab'
  })
}

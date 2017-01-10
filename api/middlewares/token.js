const database = require('../databases/mysql.js')

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

var token = {
  uid: (len) => {
    let buf = []
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charlen = chars.length

    for (var i = 0; i < charlen; i++) {
      buf.push(chars[getRandomInt(0, charlen - 1)])
    }

    return buf.join('')
  },

  checkAuth: (req, res, next) => {
    let statement = `SELECT id FROM users WHERE pseudo = ? AND password = ?`

    database.connect.query(statement, [req.body.pseudo, req.body.password], (err, result) => {
      if (err) throw err

      if (result[0]) {
        req.id = result[0]
        next()
      } else {
        res.json({ success: false, message: `Authentification failed !` })
      }
    })
  },

  checkToken: (req, res, next) => {
    if (typeof (req.get('Authorization')) !== 'undefined' && req.get('Authorization').split(' ')[0] === 'Bearer') {
      let token = req.get('Authorization').split(' ')[1]
      let statement = `SELECT id FROM users WHERE token = ?`

      database.connect.query(statement, [token], (err, result) => {
        if (err) throw err

        if (result[0]) {
          next()
        } else {
          res.json({ success: false, message: `Unauthorized access !` })
        }
      })
    } else {
      res.json({ success: false, message: `Unauthorized access !` })
    }
  }
}

module.exports = token

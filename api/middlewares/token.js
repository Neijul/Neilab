import mysql from '../databases/mysql.js'
import NeiDate from '../middlewares/neidate.js'

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export var token = {
  uid: (len) => {
    let buf = []
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charlen = chars.length

    for (var i = 0; i < charlen; i++) {
      buf.push(chars[getRandomInt(0, charlen - 1)])
    }

    return buf.join('')
  },

  isAuth: (req, res, next) => {
    let statement = `SELECT id FROM users WHERE pseudo = ? AND password = ?`

    mysql.connect.query(statement, [req.body.pseudo, req.body.password], (err, result) => {
      if (err) throw err

      if (result[0]) {
        req.user = result[0]
        next()
      } else {
        res.json({ success: false, message: `Authentification failed !` })
      }
    })
  },

  isValidToken: (req, res, next) => {
    if (typeof (req.get('Authorization')) !== 'undefined' && req.get('Authorization').split(' ')[0] === 'Bearer') {
      let token = req.get('Authorization').split(' ')[1]
      let statement = `SELECT U.id, T.generatedAt
                       FROM users U
                       JOIN tokens T
                       ON U.tokenId = T.id
                       WHERE T.accessToken = ?`

      mysql.connect.query(statement, [token], (err, result) => {
        if (err) throw err

        if (result[0]) {
          let date = new NeiDate()
          date.dateDiff(result[0].generatedAt, Date.now())

          if (date.getDays() === 1) {
            res.json({ success: false, test: date.getHours(), message: `This access token is expired. Unauthorized access !` })
          } else {
            next()
          }
        } else {
          res.json({ success: false, message: `Refused access token. Unauthorized access !` })
        }
      })
    } else {
      res.json({ success: false, message: `This resource require an Authorization Bearer. Unauthorized access !` })
    }
  }
}

import mysql from '../databases/mysql.js'

export let neiPerms = {
  admin (req, res, next) {
    let statement = `SELECT permId FROM users WHERE permId = 2 AND id = ?`
    mysql.connect.query(statement, [req.body.id], (err, result) => {
      if (err) throw err

      if (result[0]) {
        next()
      } else {
        res.json({ success: false, errorCode: 10 })
      }
    })
  }
}

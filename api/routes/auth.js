const express = require('express')
const token = require('../middlewares/token.js')
const database = require('../databases/mysql.js')

let auth = express.Router()

// Auth
auth.route('/auth')
.post(token.checkAuth, (req, res) => {
  let accessToken = token.uid(255)
  let statement = `UPDATE users SET token = ? WHERE id = ?`

  database.connect.query(statement, [accessToken, req.id], (err, result) => {
    if (err) throw err

    if (result.affectedRows > 0) {
      res.json({ success: true, token: accessToken })
    } else {
      res.json({ success: false, error: `101` })
    }
  })
})

module.exports = auth

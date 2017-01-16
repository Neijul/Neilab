const express = require('express')
const bodyParser = require('body-parser')

let api = express()

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

// Routes
api.use(require('./api/routes/auth.js'))
api.use(require('./api/routes/team.js'))

api.listen(8080)

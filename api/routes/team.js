const express = require('express')
const token = require('../middlewares/token.js')
const neiPerms = require('../middlewares/neiPerms.js')

let team = express.Router()

team.route('/teams')

.get((req, res) => {
  res.json({ message: `Affiche tous les membres de l'equipe` })
})

team.route('/team/:id')

.get((req, res) => {
  res.json({ message: `Affiche les informations du membre ${req.params.id}` })
})

.put(token.isValidToken, neiPerms.admin, (req, res) => {
  res.json({ message: `Modifie les information du membre ${req.params.id}` })
})

.delete((req, res) => {
  res.json({ message: `Supprime l'utilsiateur ${res.params.id}` })
})

module.exports = team

const express = require('express')
const token = require('../middlewares/token.js')

let host = express.Router()

.get(token.checkToken, (req, res) => {
  res.json({ message: `Affiche tous les hébergement web` })
})

.post(token.checkToken, (req, res) => {
  res.json({ message: `Ajoute un hébergement web` })
})

host.route('/host/:id')

.get(token.checkToken, (req, res) => {
  res.json({ message: `Affiche les informations de l'hébergement web ${req.params.id}` })
})

.put(token.checkToken, (req, res) => {
  res.json({ message: `Modifie les informations de l'hébergement web ${req.params.id}` })
})

.delete(token.checkToken, (req, res) => {
  res.json({ message: `Supprime l'hébergement ${req.params.id}` })
})

host.route('/host/:id_host/client')

.get(token.checkToken, (req, res) => {
  res.json({ message: `Affiche tous les clients de l'hébergement web ${req.params.id_host}` })
})

.post(token.checkToken, (req, res) => {
  res.json({ message: `Ajoute un client à l'hébergement web ${req.params.id_host}` })
})

module.exports = host

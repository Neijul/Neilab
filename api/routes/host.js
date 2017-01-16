const express = require('express')
const token = require('../middlewares/token.js')

let host = express.Router()

host.route('/hosts')

.get(token.isValidToken, (req, res) => {
  res.json({ message: `Affiche tous les hébergement web` })
})

.post(token.isValidToken, (req, res) => {
  res.json({ message: `Ajoute un hébergement web` })
})

host.route('/host/:id')

.get(token.isValidToken, (req, res) => {
  res.json({ message: `Affiche les informations de l'hébergement web ${req.params.id}` })
})

.put(token.isValidToken, (req, res) => {
  res.json({ message: `Modifie les informations de l'hébergement web ${req.params.id}` })
})

.delete(token.isValidToken, (req, res) => {
  res.json({ message: `Supprime l'hébergement ${req.params.id}` })
})

host.route('/host/:id_host/client')

.get(token.isValidToken, (req, res) => {
  res.json({ message: `Affiche tous les clients de l'hébergement web ${req.params.id_host}` })
})

.post(token.isValidToken, (req, res) => {
  res.json({ message: `Ajoute un client à l'hébergement web ${req.params.id_host}` })
})

module.exports = host

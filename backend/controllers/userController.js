const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST signin
exports.signin = (req, res, _next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        birthDate: req.body.birthDate
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => {
          console.log(error)
          res.status(400).json(error)
        })
    })
    .catch((error) => res.status(500).json({ error }))
}

// POST login
exports.login = (req, res, _next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: 'E-mail non trouvé dans la base de données.' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            user: user,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h'
            })
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

// PUT update user
exports.update = (req, res, _next) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      user.role = 'user'
      return user.save()
    })
    .then(() => res.status(200).json({ message: 'Utilisateur mis à jour !' }))
    .catch((error) => res.status(400).json({ error }))
}

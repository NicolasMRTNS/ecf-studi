const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// GET not validated users
exports.getNotValidatedUsers = (_req, res, _next) => {
  User.find({ role: 'not-validated-user' })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }))
}

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
          .json({ message: 'E-mail non trouvé dans la base de données.' })
      }
      if (user.role === 'not-validated-user') {
        return res
          .status(401)
          .json({ message: "Votre compte n'a pas encore été validé." })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' })
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
  User.findById(req.body.userIdConfirmed)
    .then((user) => {
      user.role = 'user'
      return user.updateOne(user)
    })
    .then(() => res.status(200).json({ message: 'Utilisateur mis à jour !' }))
    .catch((error) => res.status(400).json({ error }))
}

// DELETE delete user
exports.deleteUser = (req, res, _next) => {
  User.findById(req.body.userIdDeleted)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' })
      }
      if (user.role === 'not-validated-user') return user.deleteOne()
    })
    .then(() =>
      res.status(200).json({ message: 'Utilisateur supprimé avvec succès.' })
    )
    .catch((error) => res.status(500).json({ error }))
}

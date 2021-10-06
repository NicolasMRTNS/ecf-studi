const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

const app = express()

//Connection to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

//Headers to handle CORS
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, enctype'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(express.json())

app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)

module.exports = app

const Book = require('../models/Book')
const moment = require('moment')

// GET /books
exports.getAllBooks = (_req, res, _next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books)
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

// POST /books
exports.registerBook = (req, res, _next) => {
  const book = new Book({
    ...req.body,
    addedDate: moment().format('DD/MM/YYYY'),
    cover: `${req.protocol}://${req.get('host')}/covers/${req.file.filename}`
  })
  return book
    .save()
    .then(() => {
      res.status(201).json({ message: 'Ouvrage enregistré avec succès' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

// PUT /books/:id user borrow
exports.borrowBook = (req, res, _next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.available = false
      book.borrowedDate = moment().format('DD/MM/YYYY')
      book.borrowedBy = req.body.userId
      return book.save()
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage emprunté avec succès' })
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

// PUT /books/:id employee confirm
exports.retrieveBook = (req, res, _next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.retrievedDate = moment().format('DD/MM/YYYY')
      book.borrowConfirmed = true
      book.dueDate = moment().add(3, 'weeks').format('DD/MM/YYYY')
      return book.save()
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage retiré avec succès' })
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

// PUT /books/:id book return
exports.returnBook = (req, res, _next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.available = true
      book.borrowedBy = null
      book.borrowedDate = null
      book.retrievedDate = null
      book.borrowConfirmed = false
      book.dueDate = null
      return book.save()
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage rendu avec succès' })
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}

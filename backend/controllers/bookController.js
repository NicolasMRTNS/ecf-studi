const Book = require('../models/Book')
const moment = require('moment')
const books = require('../booksDatabaseInjection')

// GET /books
exports.getAllBooks = (_req, res, next) => {
  Book.find()
    .then((books) => {
      books.forEach((book) => {
        if (moment(book.borrowedDate).add(3, 'days').unix() < moment().unix()) {
          Book.findById(book._id)
            .then((book) => {
              book.borrowedDate = null
              book.available = true
              book.borrowedBy = null
              return book.updateOne(book)
            })
            .then(() => {
              next()
            })
            .catch((error) => res.status(500).json({ error }))
        }
      })
    })
    .catch((error) => res.status(500).json({ error }))
  Book.find()
    .then((books) => {
      res.status(200).json(books)
    })
    .catch((error) => res.status(500).json({ error }))
}

// POST /books
exports.registerBook = (req, res, _next) => {
  const book = new Book({
    ...req.body,
    addedDate: moment().format('YYYY-MM-DD'),
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

exports.injectToDatabase = (_req, res, _next) => {
  const booksArray = []
  for (const newBook of books) {
    const newBookModel = new Book({ ...newBook })
    booksArray.push(newBookModel)
  }
  return Book.insertMany(booksArray)
    .then(() => {
      res.status(201).json({ message: 'Ouvrages enregistrés avec succès' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

// PUT /books/:id/borrow user borrow
exports.borrowBook = (req, res, _next) => {
  Book.findById(req.body.bookId)
    .then((book) => {
      book.available = false
      book.borrowedDate = moment().format('YYYY-MM-DD')
      book.borrowedBy = req.body.userId
      return book.updateOne(book)
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage emprunté avec succès.' })
    })
    .catch((error) => res.status(500).json({ error }))
}

// PUT /books/:id/retrieve employee confirm
exports.retrieveBook = (req, res, _next) => {
  Book.findById(req.body.bookId)
    .then((book) => {
      book.retrievedDate = moment().format('YYYY-MM-DD')
      book.borrowConfirmed = true
      book.retrieveConfirmedBy = req.body.userId
      book.dueDate = moment().add(3, 'weeks').format('YYYY-MM-DD')
      return book.updateOne(book)
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage retiré avec succès.' })
    })
    .catch((error) => res.status(500).json({ error }))
}

// PUT /books/:id/return book return
exports.returnBook = (req, res, _next) => {
  Book.findById(req.body.bookId)
    .then((book) => {
      book.available = true
      book.borrowedBy = null
      book.borrowedDate = null
      book.retrievedDate = null
      book.borrowConfirmed = false
      book.retrieveConfirmedBy = null
      book.dueDate = null
      return book.updateOne(book)
    })
    .then(() => {
      res.status(200).json({ message: 'Ouvrage rendu avec succès.' })
    })
    .catch((error) => res.status(500).json({ error }))
}

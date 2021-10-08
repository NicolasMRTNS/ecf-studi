const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  publishingDate: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  addedDate: { type: String, required: true },
  available: { type: Boolean, required: false, default: true },
  borrowedDate: { type: Date, required: false, default: null },
  borrowConfirmed: { type: Boolean, required: false, default: false },
  borrowedBy: { type: String, required: false, default: null },
  retrievedDate: { type: Date, required: false, default: null },
  retrieveConfirmedBy: { type: String, required: false, default: null },
  dueDate: { type: Date, required: false, default: null }
})

module.exports = mongoose.model('Book', bookSchema)

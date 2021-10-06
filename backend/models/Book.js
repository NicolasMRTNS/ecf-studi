const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  publishingDate: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  addedDate: { type: String, required: true },
  available: { type: Boolean, required: true, default: true },
  borrowedDate: { type: Date, required: true, default: '' },
  borrowConfirmed: { type: Boolean, required: true, default: false },
  borrowedBy: { type: String, required: true, default: '' },
  retrievedDate: { type: Date, required: true, default: '' },
  dueDate: { type: Date, required: true, default: '' }
})

module.exports = mongoose.model('Book', bookSchema)

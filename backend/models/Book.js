const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  publishingDate: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  addedDate: { type: String, required: true },
  available: { type: Boolean, required: false, default: false },
  borrowedDate: { type: Date, required: false, default: '' },
  borrowConfirmed: { type: Boolean, required: false, default: false },
  borrowedBy: { type: String, required: false, default: '' },
  retrievedDate: { type: Date, required: false, default: '' },
  dueDate: { type: Date, required: false, default: '' }
})

module.exports = mongoose.model('Book', bookSchema)

const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.get('/', bookController.getAllBooks)
router.post('/', bookController.registerBook)
router.put('/:id', bookController.updateBook)

module.exports = router

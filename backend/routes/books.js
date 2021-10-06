const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const bookController = require('../controllers/bookController')

router.get('/', bookController.getAllBooks)
router.post('/', multer, bookController.registerBook)
router.put('/:id', bookController.borrowBook)
router.put('/:id', bookController.retrieveBook)
router.put('/:id', bookController.returnBook)

module.exports = router

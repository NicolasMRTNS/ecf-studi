const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const bookController = require('../controllers/bookController')

router.get('/', bookController.getAllBooks)
router.post('/', multer, bookController.registerBook)
router.put('/:id/borrow', bookController.borrowBook)
router.put('/:id/retrieve', bookController.retrieveBook)
router.put('/:id/return', bookController.returnBook)

module.exports = router

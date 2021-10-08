const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const bookController = require('../controllers/bookController')

router.get('/', auth, bookController.getAllBooks)
router.post('/', auth, multer, bookController.registerBook)
router.put('/:id/borrow', auth, bookController.borrowBook)
router.put('/:id/retrieve', auth, bookController.retrieveBook)
router.put('/:id/return', auth, bookController.returnBook)

module.exports = router

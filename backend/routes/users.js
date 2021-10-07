const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/notvalidatedusers', userController.getNotValidatedUsers)
router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.put('/:id/update', userController.update)

module.exports = router

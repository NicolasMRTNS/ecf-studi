const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.post('/:id/update', userController.update)

module.exports = router

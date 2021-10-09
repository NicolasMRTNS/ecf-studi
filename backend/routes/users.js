const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

router.get('/notvalidatedusers', auth, userController.getNotValidatedUsers)
router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.put('/:id/update', auth, userController.update)
router.delete('/:id/delete', auth, userController.deleteUser)

module.exports = router

const router = require('express').Router()
const {
    login,
    createUser,
    updateUser
} = require('../../controllers/userController')

router.route('/').post(createUser)

router.route('/login').post(login)

router.route('/:id').put(updateUser)

module.exports = router

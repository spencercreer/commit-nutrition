const router = require('express').Router()
const {
    getOneUser,
    createUser
} = require('../../controllers/userController')

router.route('/').post(createUser)

router.route('/:username').get(getOneUser)

module.exports = router

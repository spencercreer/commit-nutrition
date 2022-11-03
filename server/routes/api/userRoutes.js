const router = require('express').Router()
const {
    getOneUser,
    createUser,
    updateUser
} = require('../../controllers/userController')

router.route('/').post(createUser)

router.route('/:username').get(getOneUser)

router.route('/:id').put(updateUser)

module.exports = router

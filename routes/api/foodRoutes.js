const router = require('express').Router()
const {
    getFood,
    getOneFood,
    createFood
} = require('../../controllers/foodController')

router.route('/').get(getFood).post(createFood)

router.route('/:foodId').get(getOneFood)

module.exports = router
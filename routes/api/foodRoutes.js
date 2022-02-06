const router = require('express').Router()
const {
    getFood,
    getOneFood,
    createFood,
    updateFood
} = require('../../controllers/foodController')

router.route('/').get(getFood).post(createFood)

router.route('/:foodId').get(getOneFood).put(updateFood)

module.exports = router
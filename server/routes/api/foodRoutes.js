const router = require('express').Router()
const {
    getFoods,
    getOneFood,
    createFood,
    updateFood
} = require('../../controllers/foodController')

router.route('/').get(getFoods).post(createFood)

// Why do I have two update food routes
router.route('/update').post(updateFood)

router.route('/:foodId').get(getOneFood).put(updateFood)

module.exports = router

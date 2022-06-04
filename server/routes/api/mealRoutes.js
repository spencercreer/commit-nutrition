const router = require('express').Router()
const {
    getMeals,
    createMeal
} = require('../../controllers/mealController')

router.route('/').get(getMeals).post(createMeal)

module.exports = router
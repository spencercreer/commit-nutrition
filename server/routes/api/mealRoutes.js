const router = require('express').Router()
const {
    getMeals,
    getMealByDate,
    createMeal
} = require('../../controllers/mealController')

router.route('/').get(getMeals).post(createMeal)

router.route('/today').get(getMealByDate)

module.exports = router
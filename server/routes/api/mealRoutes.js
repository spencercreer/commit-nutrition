const router = require('express').Router()
const {
    getMeals,
    getMealById,
    getMealByDate,
    createMeal
} = require('../../controllers/mealController')

router.route('/').get(getMeals).post(createMeal)

router.route('/today').get(getMealByDate)

router.route('/:id').get(getMealById)

module.exports = router
const router = require('express').Router()
const {
    getMeals,
    getMealById,
    getTodaysMeal,
    getWeeksMeals,
    createMeal
} = require('../../controllers/mealController')

router.route('/').get(getMeals).post(createMeal)

router.route('/today').get(getTodaysMeal)

router.route('/week').get(getWeeksMeals)

router.route('/:id').get(getMealById)

module.exports = router

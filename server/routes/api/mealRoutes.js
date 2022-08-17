const router = require('express').Router()
const {
    getMeals,
    getMealById,
    createMeal,
    filterMeals,
    updateMealStar
} = require('../../controllers/mealController')

router.route('/').get(getMeals).post(createMeal)

router.route('/filter').post(filterMeals)

router.route('/:id').get(getMealById)

router.route('/updateStar').post(updateMealStar)

module.exports = router

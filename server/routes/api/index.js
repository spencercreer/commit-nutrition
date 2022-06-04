const router = require('express').Router()
const foodRoutes = require('./foodRoutes')
const recipeRoutes = require('./recipeRoutes')
const mealRoutes = require('./mealRoutes')

router.use('/foods', foodRoutes)
router.use('/recipes', recipeRoutes)
router.use('/meals', mealRoutes)

module.exports = router
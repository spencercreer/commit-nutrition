const router = require('express').Router()
const foodRoutes = require('./foodRoutes')
const recipeRoutes = require('./recipeRoutes')
const mealRoutes = require('./mealRoutes')

router.use('/food', foodRoutes)
router.use('/recipe', recipeRoutes)
router.use('/meal', mealRoutes)

module.exports = router
const router = require('express').Router()
const userRoutes = require('./userRoutes')
const foodRoutes = require('./foodRoutes')
const recipeRoutes = require('./recipeRoutes')
const mealRoutes = require('./mealRoutes')

router.use('/user', userRoutes)
router.use('/food', foodRoutes)
router.use('/recipe', recipeRoutes)
router.use('/meal', mealRoutes)

module.exports = router

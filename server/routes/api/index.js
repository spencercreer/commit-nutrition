const router = require('express').Router()
const foodRoutes = require('./foodRoutes')
const recipeRoutes = require('./recipeRoutes')

router.use('/foods', foodRoutes)
router.use('/recipes', recipeRoutes)

module.exports = router
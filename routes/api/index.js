const router = require('express').Router()
const foodRoutes = require('./foodRoutes')

router.use('/foods', foodRoutes)

module.exports = router
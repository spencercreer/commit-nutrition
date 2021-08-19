const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const mealPlans = require('../mealPlans')

// get all meal plans
router.get('/', (req, res) => {
    res.json(mealPlans)
})

// get single meal plans
router.get('/:id', (req, res) => {
    const found = mealPlans.some(mealPlan => mealPlan.id === parseInt(req.params.id))

    if(found) {
        res.json(mealPlans.find(mealPlan => mealPlan.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No meal plan with the id of ${req.params.id}`})
    }
})

module.exports = router
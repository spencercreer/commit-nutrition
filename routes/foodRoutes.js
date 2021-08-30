const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const mealPlans = require('../mealPlans')
const Food = require('../models/Food')

// get all meal plans
router.get('/', (req, res) => {
    Food.findAll()
        .then(foods => res.json(foods))
        .catch(err => console.log(err))
})

// get single meal plans
router.get('/:id', (req, res) => {
    Food.findOne({ where: {id: req.params.id} })
        .then(food => res.json(food))
})

module.exports = router
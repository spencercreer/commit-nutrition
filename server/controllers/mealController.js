const { Meal } = require('../models')

const mealController = {
    getMeals(req, res) {
        Meal.find()
            .select('-__v')
            .populate({
                path: 'breakfast',
                populate: {
                    path: 'foodId',
                    model: 'Food'
                }
            })
            .populate({
                path: 'lunch',
                populate: {
                    path: 'foodId',
                    model: 'Food'
                }
            })
            .populate({
                path: 'dinner',
                populate: {
                    path: 'foodId',
                    model: 'Food'
                }
            })
            .populate({
                path: 'snacks',
                populate: {
                    path: 'foodId',
                    model: 'Food'
                }
            })
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    createMeal(req, res) {
        Meal.create(req.body)
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = mealController
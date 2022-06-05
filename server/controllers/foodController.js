const { Food } = require('../models')

const foodController = {
    getFoods(req, res) {
        Food.find()
            .then((dbFoodData) => res.json(dbFoodData))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    getOneFood(req, res) {
        Food.findOne({ _id: req.params.foodId })
            .then((dbFoodData) => {
                if (!dbFoodData) {
                    return res.status(404).json({ message: 'No food with this id.' })
                }
                res.json(dbFoodData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    createFood(req, res) {
        Food.create(req.body)
            .then((dbFoodData) => {
                res.json(dbFoodData)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    updateFood(req, res) {
        Food.findOneAndUpdate({ _id: req.params.foodId }, { $set: req.body })
            .then((dbFoodData) => {
                if (!dbFoodData) {
                    return res.status(404).json({ message: 'No food with this id.' })
                }
                res.json(dbFoodData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = foodController
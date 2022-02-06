const { Recipe, Food } = require('../models')

const recipeController = {
    getRecipes(req, res) {
        Recipe.find()
            .select('-__v')
            .then((dbRecipeData) => {
                res.json(dbRecipeData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getOneRecipe(req, res) {
        Recipe.findOne({ _id: req.params.recipeId })
            .select('-__v')
            .populate('foods')
            .then((dbRecipeData) => {
                if (!dbRecipeData) {
                    return res.status(404).json({ message:'No recipe with this id.'})
                }
                res.json(dbRecipeData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    createRecipe(req, res) {
        Recipe.create(req.body)
            .then((dbRecipeData) => {
                res.json(dbRecipeData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = recipeController
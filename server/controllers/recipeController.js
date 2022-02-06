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
    },
    addIngredient(req, res) {
        Recipe.findOneAndUpdate(
            { _id: req.params.recipeId },
            { $addToSet: { ingredients: req.body}}
        )
            .then((dbRecipeData) => {
                if (!dbRecipeData) {
                    return res.status(404).json({
                        message: 'No recipe with this id.'
                    })
                }
                res.json(dbRecipeData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    removeIngredient(req, res) {
        console.log(req.params)
        Recipe.findOneAndUpdate(
            { _id: req.params.recipeId },
            { $pull: { ingredients: { foodId: req.params.foodId } } }
        )
            .then((dbRecipeData) => {
                if (!dbRecipeData) {
                    return res.status(404).json({ message: 'No recipe with this id.'})
                }
                res.json(dbRecipeData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = recipeController
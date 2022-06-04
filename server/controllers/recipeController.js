const { Recipe } = require('../models')

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
        // req.body example
        // {
        //     "name": "Recipe with quick oats",
        //     "ingredients": [{
        //         "foodId": "61ff38830c3a4f7cbf4f1ab5"
        //     }
        //     ]
        // }
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
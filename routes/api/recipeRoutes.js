const router = require('express').Router()
const {
    getRecipes,
    getOneRecipe,
    createRecipe,
    addIngredient
} = require('../../controllers/recipeController')

router.route('/').get(getRecipes).post(createRecipe)

router.route('/:recipeId/ingredients').post(addIngredient)

module.exports = router
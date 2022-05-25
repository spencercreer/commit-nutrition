const router = require('express').Router()
const {
    getRecipes,
    getOneRecipe,
    createRecipe,
    addIngredient,
    removeIngredient
} = require('../../controllers/recipeController')

// /api/recipes
router.route('/').get(getRecipes).post(createRecipe)

router.route('/:recipeId').get(getOneRecipe)

router.route('/:recipeId/ingredients').post(addIngredient)

router.route('/:recipeId/ingredients/:foodId').delete(removeIngredient)

module.exports = router
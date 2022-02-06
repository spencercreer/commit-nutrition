const router = require('express').Router()
const {
    getRecipes,
    getOneRecipe,
    createRecipe
} = require('../../controllers/recipeController')

router.route('/').get(getRecipes).post(createRecipe)

module.exports = router
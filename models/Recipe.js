const { Schema, model } = require('mongoose')
const ingredientSchema = require('./Ingredient')

const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Recipe name required',
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        serving_size: {
            type: String
        },
        serving_size_grams: {
            type: Number
        },
        recipe_servings: {
            type: Number
        },
        recipe_cost: {
            type: Number
        },
        ingredients: [ingredientSchema]
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
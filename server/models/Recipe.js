const { Schema, model } = require('mongoose')
const servingSchema = require('./Serving')
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
        serving: {
            type: servingSchema
        },
        serving_size_grams: {
            type: Number
        },
        recipe_servings: {
            type: Number
        },
        total_calories: {
            type: Number
        },
        total_carbs: {
            type: Number
        },
        total_protein: {
            type: Number
        },
        total_fat: {
            type: Number
        },
        total_sodium: {
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
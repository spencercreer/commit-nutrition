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
        calories: {
            type: Number
        },
        carbs: {
            type: Number
        },
        protein: {
            type: Number
        },
        fat: {
            type: Number
        },
        sodium: {
            type: Number
        },
        recipe_cost: {
            type: Number
        },
        notes: {
            type: String
        },
        ingredients: [ingredientSchema]
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
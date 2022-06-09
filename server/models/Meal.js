const { Schema, model } = require('mongoose')
const ingredientSchema = require('./Ingredient')
const recipeIngredientSchema = require('./RecipeIngredient')

const mealSchema = new Schema(
    {
        date: {
            type: Date
        },
        breakfast: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema]
        },
        lunch: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema]
        },
        dinner: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema]
        },
        snacks: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema]
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
        }
    }
)

const Meal = model('Meal', mealSchema)

module.exports = Meal
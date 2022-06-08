const { Schema, model } = require('mongoose')
const ingredientSchema = require('./Ingredient')
const recipeIngredientSchema = require

const mealSchema = new Schema(
    {
        date: {
            type: Date
        },
        breakfast: [ingredientSchema],
        lunch: [ingredientSchema],
        dinner: [ingredientSchema],
        snacks: [ingredientSchema],
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
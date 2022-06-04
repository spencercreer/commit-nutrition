const { Schema, model } = require('mongoose')
const ingredientSchema = require('./Ingredient')

const mealSchema = new Schema(
    {
        date: {
            type: Date
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
        ingredients: [ingredientSchema]
    }
)

const Meal = model('Meal', mealSchema)

module.exports = Meal
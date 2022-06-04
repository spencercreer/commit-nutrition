const { Schema, model } = require('mongoose')

const ingredientSchema = new Schema(
    {
        foodId: {
            type: Schema.Types.ObjectId,
            ref: 'Food'
        },
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        amount: {
            type: String
        },
        number_of_servings: {
            type: Number
        }
    },
    {
        _id: false
    }
)

module.exports = ingredientSchema
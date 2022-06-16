const { Schema } = require('mongoose')

const recipeIngredientSchema = new Schema(
    {
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        number_of_servings: {
            type: Number
        }
    },
    {
        _id: false
    }
)

module.exports = recipeIngredientSchema
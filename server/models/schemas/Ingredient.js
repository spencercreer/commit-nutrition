const { Schema } = require('mongoose')

const ingredientSchema = new Schema(
    {
        foodId: {
            type: Schema.Types.ObjectId,
            ref: 'Food'
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

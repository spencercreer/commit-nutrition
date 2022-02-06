const { Schema, model } = require('mongoose')

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
        ingredients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Food'
            }
        ]
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
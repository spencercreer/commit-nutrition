const { Schema, model } = require('mongoose')
const servingSchema = require('./schemas/Serving')

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Food name required',
        },
        description: {
            type: String
        },
        brand: {
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
        container_servings: {
            type: Number
        },
        container_price: {
            type: Number
        }
    }
)

const Food = model('Food', foodSchema)

module.exports = Food

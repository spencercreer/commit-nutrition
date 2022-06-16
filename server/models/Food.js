const { Schema, model } = require('mongoose')
const servingSchema = require('./Serving')

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
        // serving_size: {
        //     size: { type: Number },
        //     unit: { type: String }
        // },
        serving_size_grams: {
            type: Number
        },
        // calories: {
        //     type: Number
        // },
        // carbs: {
        //     type: Number
        // },
        // protein: {
        //     type: Number
        // },
        // fat: {
        //     type: Number
        // },
        sodium: {
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
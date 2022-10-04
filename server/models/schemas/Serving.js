const { Schema } = require('mongoose')

const servingSchema = new Schema(
    {
        size: {
            type: Number
        },
        unit: {
            type: String
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
    },
    {
        _id: false
    }
)

module.exports = servingSchema

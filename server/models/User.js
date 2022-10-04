const { Schema, model } = require('mongoose')
const mealSchema = require('./Meal')

const userSchema = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        birthdate: {
            type: Date
        },
        gender: {
            type: String
        },
        weight: {
            type: Number
        },
        height: {
            type: Number
        },
        recipes: {
            type: [Schema.Types.ObjectId]
        },
        meals: {
            type: [Schema.Types.ObjectId]
        }
    }
)

const User = model('User', userSchema)

module.exports = User

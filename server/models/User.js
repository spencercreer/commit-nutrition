const { Schema, model } = require('mongoose')
const mealSchema = require('./Meal')

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        password: {
            type: String
        },
        meals: {
            type: [mealSchema]
        }
    }
)

const User = model('User', userSchema)

module.exports = User
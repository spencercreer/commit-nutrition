const { Schema, model } = require('mongoose')
const mealSchema = require('./Meal')

const userSchema = new Schema(
    {
        name: {
            first: String,
            last: String,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual("full_name").get(function () {
    return this.name.first + ' ' + this.name.last;
});

const User = model('User', userSchema)

module.exports = User

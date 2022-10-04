const { Schema, model } = require('mongoose')
const ingredientSchema = require('./schemas/Ingredient')
const recipeIngredientSchema = require('./schemas/RecipeIngredient')

const mealSchema = new Schema(
    {
        name: {
            type: String
        },
        date: {
            type: Date
        },
        status: {
            // active, archived
            type: String
        },
        starred: {
            type: Boolean
        },
        breakfast: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema],
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
            }
        },
        lunch: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema],
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
            }
        },
        dinner: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema],
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
            }
        },
        snacks: {
            ingredients: [ingredientSchema],
            recipes: [recipeIngredientSchema],
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
            }
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
        }
    }
)

const Meal = model('Meal', mealSchema)

module.exports = Meal
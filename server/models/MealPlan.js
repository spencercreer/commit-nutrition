//TODO: Change Meal model to meal plan model and then breakfast, lunch into a smaller meal schema
const { Schema, model } = require('mongoose')
const ingredientSchema = require('./Ingredient')
const recipeIngredientSchema = require('./RecipeIngredient')

const mealPlanSchema = new Schema(
    {
        date: {
            type: Date
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

const MealPlan = model('MealPlan', mealPlanSchema)

module.exports = MealPlan
const { Meal } = require('../models')

const mealController = {
    getMeals(req, res) {
        Meal.find()
            .select('-__v')
            .sort({ date: 1 })
            .populate(
                [
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    }
                ]
            )
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    getMealByDate(req, res) {
        //Need to search for the date only not time
        console.log(Date.now())
        Meal.find()
            .where('date').equals(Date.now())
            .select('-__v')
            .sort({ date: 1 })
            .populate(
                [
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    }
                ]
            )
            .then((dbMealData) => {
                console.log(dbMealData)
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    createMeal(req, res) {
        Meal.create(req.body)
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = mealController
const { Meal } = require('../models')
const moment = require('moment')

const populate = [
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
        path: 'lunch',
        populate: {
            path: 'recipes',
            populate: {
                path: 'recipeId',
                model: 'Recipe'
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
        path: 'dinner',
        populate: {
            path: 'recipes',
            populate: {
                path: 'recipeId',
                model: 'Recipe'
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
    },
    {
        path: 'snacks',
        populate: {
            path: 'recipes',
            populate: {
                path: 'recipeId',
                model: 'Recipe'
            }
        }
    }
]

const mealController = {
    getMeals(req, res) {
        const sort = -1
        Meal.find()
            .select('-__v')
            .sort({ date: sort })
            .populate(populate)
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    getMealById(req, res) {
        Meal.findOne({ _id: req.params.id })
            .select('-__v')
            .populate(populate)
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    filterMeals(req, res) {
        let sort = req.body.sort === "asc" ? 1 : -1
        const filter = req.body.filter
        let where
        switch (filter) {
            case 'today':
                const today = moment().startOf('day')
                where = {
                    date: {
                        $gte: today.toDate(),
                        $lte: moment(today).endOf('day').toDate()
                    }
                }
                break;
            case 'week':
                const weekStart = moment().startOf('week')
                where = {
                    date: {
                        $gte: weekStart.toDate(),
                        $lte: moment(weekStart).endOf('week').toDate()
                    }
                }
                break;
            case 'starred':
                where = {
                    starred: true
                }
                break;
            case 'archived':
                where = {
                    status: "archived"
                }
                break;
            default:
                where = {}
                break;
        }
        Meal.find(where)
            .select('-__v')
            .populate(populate)
            .sort({ date: sort })
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })

    },
    getTodaysMeal(req, res) {
        //Need to search for the date only not time
        const today = moment().startOf('day')
        Meal.findOne({
            date: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        })
            .select('-__v')
            .populate(populate)
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    createMeal(req, res) {
        const date = moment(req.body.date).format()
        // can this be updated to like the get above
        Meal.findOne({ date })
            .then((foundMeal) => {
                if (foundMeal) {
                    res.json({ success: false, message: 'matching meal plan date' });
                } else {
                    Meal.create(req.body)
                        .then((dbMealData) => {
                            res.json({ success: true, ...dbMealData })
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    updateMealStar(req, res) {
        _id = req.body.mealId
        starred = req.body.starred
        Meal.updateOne({ _id }, { starred })
            .then((updatedMeal) => {
                res.json({ success: true, ...updatedMeal })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = mealController
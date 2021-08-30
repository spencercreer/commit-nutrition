const Sequelize = require('sequelize')
const db = require('../config/database')

const Food = db.define('foods', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    serving_size: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.DOUBLE
    },
    carbs: {
        type: Sequelize.DOUBLE
    },
    protein: {
        type: Sequelize.DOUBLE
    },
    fat: {
        type: Sequelize.DOUBLE
    },
    sodium: {
        type: Sequelize.DOUBLE
    },
})

module.exports = Food
const Sequelize = require('sequelize')

module.exports = new Sequelize('mealsdb', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})
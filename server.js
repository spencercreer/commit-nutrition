// Dependencies
const express = require('express')
const mysql = require('mysql2')
const path = require('path')
require('dotenv').config()

const db = require('./config/database')

// Test db connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('db authenticate error: ' + err))

// Set up port
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Give the server access to the routes
app.use('/', require('./routes/htmlRoutes'))
app.use('/api/foods', require('./routes/foodRoutes'))

app.listen(PORT, () => {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
})


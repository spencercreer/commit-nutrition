// Dependencies
const express = require('express')
const mysql = require('mysql2')
const path = require('path')

// Set up port
const PORT = process.env.PORT || 8080

// Set up app instance and configure middleware needed
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Give the server access to the routes
app.use('/', require('./routes/htmlRoutes'))
app.use('/api/mealPlans', require('./routes/apiRoutes'))

app.listen(PORT, () => {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
})


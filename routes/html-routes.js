const express = require('express')
const router = express.Router()
const path = require('path')

// Meal plan html route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

// Export routes to server.js
module.exports = router
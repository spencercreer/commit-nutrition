// Dependencies
const express = require('express')
// const mysql = require('mysql')

// Create express app instance and configure middleware needed
const app = express()
app.use(express.json())
app.use(express.static("public"));

// Set up port
const PORT = 8080

// Import routes and give the server access to them
const routes = require('./routes/html-routes.js');
app.use(routes);

app.listen(PORT, () => console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT))
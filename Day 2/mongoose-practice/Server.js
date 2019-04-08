const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// server setup
const app = express()
const api = require('./server/routes/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/peopleDB', { useNewUrlParser: true })


const port = 4200
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})


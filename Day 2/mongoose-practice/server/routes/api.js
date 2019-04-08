const express = require('express')
const router = express.Router()
const Person = require('../models/Person')


router.get('/sanity', function (req, res) {
    res.send("OK!")
})

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })  
})


// ------------------------------
// Exercise 1
// save a person ( optional parameters)
// Create a post route called 
// 'person' in the server above that receives an object with a first name, last name, and age.
// ------------------------------
router.get('/person', function (req, res) {
    const query = req.query

    const name = query.name
    const age = query.age
    const lastname = query.lastname

    let p1 = new Person({ firstName: name, lastName: lastname, age: age })
    //p1.save()
    res.end("saved...")
})

// ----------------------------
// IMPORTANT : you will need for this the body parser. Look for Week 4, day 3 Express Crud - body-parser 
// ----------------------------
router.post('/person', function (req, res) {
    
    let name = req.body.firstName
    let age = req.body.age
    let lastName = req.body.lastName

    // console.log(`name : ${name}, age : ${age}, lastname : ${lastName}`)   
    let p1 = new Person({ firstName: name, lastName: lastName, age: age })
    p1.save()

    res.end("saved thru post...")
})

// ------------------------------
// Exercise 2
// Create a put route called /person that receives a required param of id. 
// Use this id to update that person's age to 80.
// ------------------------------

router.put('/person', function (req, res) {

    const argID = req.query.id
    console.log(`updating ${argID} with the age -> 80 `)
    Person.findByIdAndUpdate(argID, { age: 80 }, { new: true },function (err, person) {
        console.log("updated in server... ")
        res.end("updated...")
    })
   
})

// ------------------------------
// Exercise 3
// Create a delete route called /apocalypse which removes all the data from your people collection.
// ------------------------------
router.delete('/person', function(req,res) {
    Person.deleteMany({}) // suppouse to work...
    console.log("deleting... ")
    res.send("deleted!")
})

module.exports = router

// ========================
// CRUD Mongo
// ========================

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ====================== 
// Create
// ======================

const addressSchema = new Schema({
    city: String,
    street: String,
    apartment: Number
})

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    address : addressSchema
})

// --------------------------------------------------
// single creation
const Person = mongoose.model('Person', personSchema)
let p1 = new Person({ firstName: "David", lastName: "Smith", age: 25 })
//p1.save()
// --------------------------------------------------
// multiple creation
let p2 = new Person({ firstName: "Shoo", lastName: "Bert", age: 50 })
let p3 = new Person({ firstName: "Shoob", lastName: "Ert", age: 34 })
let p4 = new Person({ firstName: "Sh", lastName: "Oobert", age: 10 })
let p5 = new Person({ firstName: "Shoober", lastName: "T", age: 44 })
let allTheShooberts = [p2, p3, p4, p5]
//allTheShooberts.forEach(s => s.save())
// --------------------------------------------------

// ======================
// Retrieve
// ======================

// async find
// Person.find({}, function (err, people) {
//     console.log(people)
// })

// using promise:
const poeplePromise = Person.find({age: { $gt: 30 }})

poeplePromise.then(function (people) {
    //console.log(people)
})

// ======================
// Update
// ======================

Person.findById("5caafeb8c345cc11004097de", function (err, person) {
    person.age += 10 //how time flies
    person.save()
})
// mongoose will show the updated object but the old version of it
// { new: true } - will show the new version of that obj
Person.findByIdAndUpdate("5caafeb8c345cc11004097de", { age: 70 }, { new: true },function (err, person) {
    //console.log(person)
})

// ======================
// Delete
// ======================
// commented the remove, so it wont remove or throw error... 
// Person.findById("5caafeb8c345cc11004097dc", function (err, person) {
//     person.remove(function (err) {
//         console.log(err) //usually this will be `null`, unless something went wrong
//     })
// })


module.exports = Person
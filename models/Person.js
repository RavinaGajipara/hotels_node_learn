const mongoose = require('mongoose'); 

// Define the Person Schema
const personScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }
});
// check mongoose documention to know more about schema

//create Person model
const Person = mongoose.model('Person',personScheme);
module.exports = Person;
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
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
    },
    username:{
        required: true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});
// check mongoose documention to know more about schema

personScheme.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modiified (oe is new)
    if(!person.isModified('password')) return next();
    try{
        //hash password genneration
        const salt = await bcrypt.genSalt(10);

        //hash password generation
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed one
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
})

personScheme.methods.comparePassword= async function(candidatePassword){
    try{
        // use bcrypt to compare the provided password with te hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create Person model
const Person = mongoose.model('Person',personScheme);
module.exports = Person;
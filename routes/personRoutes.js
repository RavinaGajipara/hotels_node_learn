const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//GET method to get the person data
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data Fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:wrokType', async (req, res) => {
    try {
        const wrokType = req.params.wrokType;//Extraxt workType from URL parameter
        if (wrokType == 'chef' || wrokType == 'manager' || wrokType == 'waiter') {
            const response = await Person.find({ work: wrokType });
            console.log('response fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'Invalid work Type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.put('/:id', async (req, res) => {//:id is variable here
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true //runs mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;

    //assuming you have a Person Model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'})
        
    }catch(err){
         console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;

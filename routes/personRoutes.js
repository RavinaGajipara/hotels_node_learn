const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken}= require('./../jwt');

//POST route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        
        const token = generateToken(payload);
        console.log('token is:',token);
        
        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//Login Route
router.post('/login', async(req,res)=>{
    try{
        //Extract Username and password from request body
        const {username, password}= req.body;

        //Find the user by username
        const user= await Person.findOne({username: username});

        //If user does not exist or password does not match, send error
        const isPasswordMatch = await user.comparePassword(password);

        if(!user || !isPasswordMatch) {
            return res.status(401).json({error: 'Invalid username or password'});
        } 

        //generate tokens
         const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        
        //return token as response
        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Profile Route
router.get('/profile', jwtAuthMiddleware, async (req,res)=>{
    try{
        const userData = req.user;
        console.log("user data:", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json(user);
        
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//GET method to get the person data
router.get('/', jwtAuthMiddleware, async (req, res) => {
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

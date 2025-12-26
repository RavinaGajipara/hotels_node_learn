const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const menuItem = new MenuItem(data);
        const response = await menuItem.save();
        console.log('menuItem data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data Fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;//Extraxt taste from URL parameter
        if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
            const response = await MenuItem.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'Invalid taste Type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;
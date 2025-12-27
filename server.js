const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
// req.body
// jo bhi data client se aa raha hai, wo pehle body-parser ke pass jayega, body-parser use prosess
// karke req.body me save karega

const MenuItem = require('./models/Menu');

app.get('/', function (req, res) {
    res.send('Welcom to my hotel')
}) // this works as menu item

app.get('/chicken', (req, res) => {
    res.send('Sure sir, we serve chicken')
}) // here /chicken is working as menu item

app.get('/idli', (req, res) => {
    var custom = {
        name: "rave",
        size: "10",
        is_sambhar: true
    }
    res.send(custom)
})

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
const PORT = process.env.PORT || 3000;

const personRouters = require('./routes/personRoutes'); //Import route file
app.use('/person',personRouters); //use the routers

const menuItemRoutes = require('./routes/menuItemRoutes'); 
app.use('/menuItem',menuItemRoutes);

app.listen(PORT, () => {
    console.log('server is listening');
})// tells that 3000 port pe server active hai
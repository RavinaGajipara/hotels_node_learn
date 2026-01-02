const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth') ;

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
// req.body
// jo bhi data client se aa raha hai, wo pehle body-parser ke pass jayega, body-parser use prosess
// karke req.body me save karega
// whenever we use app.use .. these all are middlewares

//middleware function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // move to next phase, middleware always call next function, next is like callback function in express 
}

//app.use(logRequest); // prints log for every request


app.use(passport.initialize());

//const MenuItem = require('./models/Menu');
const localAuthMiddleware = passport.authenticate('local',{session: false});

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


const PORT = process.env.PORT || 3000;

const personRouters = require('./routes/personRoutes'); //Import route file
app.use('/person', personRouters); //use the routers // here logRequest is middleware

const menuItemRoutes = require('./routes/menuItemRoutes'); 
app.use('/menu',logRequest, menuItemRoutes); 

app.listen(PORT, () => {
    console.log('server is listening');
})// tells that 3000 port pe server active hai
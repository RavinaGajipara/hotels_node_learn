//This file is responsible for connetion with database
//mongoose act as bridge between node js server and mongodb server

// to start the mongodb server, run this command in cmd as administrator
// command: mongod --dbpath D:\MongoDb\data\db
const mongoose = require("mongoose");

//Define the MongoDN connection URL
const mongoURL = 'mongodb://localhost:27017/hotel' //replace "mydatabase" (hotels)with your db name

//Set up mongodb connections
mongoose.connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//Mongoose maintains a default connection object(db) representing the MongoDb coonection
const db = mongoose.connection;

//Define event listners fir database connection
db.on('connected', ()=>{
    console.log('connected to Mongodb server');
});

db.on('error', (err)=>{
    console.log('MongoDb connection error', err);
});

db.on('disconnected', ()=>{
    console.log('MongpDb Disconnected');
});

//Export the database connection
module.exports = db;
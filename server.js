//import express
const express = require('express');

//import feedback module
const Feedback = require('./DB/feedbackModel');

const cors = require('cors');

//run the express
const app = express();

//import mongoose
const mongoose = require('mongoose');

//mongodb URI
mongoose.connect("mongodb+srv://apeHandaUser:apeHandaUser@clusterapehanda-rqblm.mongodb.net/ApeHandaDB?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology:true});

console.log("Ape Handa Database connected!");


app.use(cors({ origin: "*" }));

// //Use JSON File
// app.use(express.json({extended:false},require('./API/FeedbackAPI')));

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.route('/api/cats').post((req, res) => {
  var json = req.body;
  console.log(json)
  res.send(201, req.body)
  sendDatabase(json);
});

function sendDatabase(json){

    const{comments,email,lname,name,rating,subscribe} = json;

    let feedback = {};
    feedback.firstname = name;
    feedback.lastname = lname;
    feedback.email = email;
    feedback.comments = comments;
    feedback.rating = rating;
    feedback.subscribe = subscribe;
    let feedbackModel = new Feedback(feedback);
    feedbackModel.save();
}

//Port 8080 
const Port = process.env.Port || 8000;

//Display the connection is success
app.listen(Port, () => console.log("Ape Handa Server Run - Port 8000"));


 
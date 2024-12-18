var express = require("express"); // import express
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose'); // MongoDB import
const Student = require('./models/student.model');
const Subjects = require('./models/subjects.model');
const Results = require('./models/results.model');
mongoose.connect('mongodb://127.0.0.1:27017/SCUStudents'); // connect to the database

var app = express(); // create an express app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to SCU Students API");
});


  // Add new result to the database

app.post("/results", (req, res) => {
  const results = new Results(req.body);

  results.save()
    .then(() => {
      res.json({
        message: "New results added successfully."
      });
    })
    .catch((error) => {
      res.json({
        message: "Failed to add new results.",
        error: error.message
      });
    });
});


  // Retrieve all results from the database

app.get("/results", (req, res) => {
  Results.find()
    .then((results) => {
      res.status(200).json({
        message: "Results retrieved successfully.",//response
        ALL_Results: results // data documents
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to find results.",
        error: error.message
      });
    });
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

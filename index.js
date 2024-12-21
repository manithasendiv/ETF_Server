var express = require("express"); // import express
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose'); // MongoDB import
const Student = require('./models/student.model');
const Subjects = require('./models/subjects.model');
const Results = require('./models/results.model');
mongoose.connect('mongodb://127.0.0.1:27017/SCUStudents'); // connect to the database

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/SCUStudents', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

var app = express(); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to SCU Students API");
});

// Add new result to the database
app.post("/results", (req, res) => {
  const result = new Results(req.body);

  result.save()
    .then(() => {
      res.json({
        message: "New result added successfully."
      });
    })
    .catch((error) => {
      res.json({
        message: "Failed to add new result.",
        error: error.message
      });
    });
});

// Retrieve a single result using the sid
app.get("/results/:sid", (req, res) => {
  const sid = req.params.sid; // Extract the sid from the request parameters

  // Find the result using the sid
  Results.findOne({ sid: sid })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Result not found for the provided SID."
        });
      }
      res.status(200).json({
        message: "Result retrieved successfully.",
        result: result 
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to retrieve result.",
        error: error.message
      });
    });
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
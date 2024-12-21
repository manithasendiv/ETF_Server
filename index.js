var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose"); // mongoDB connection
const Student = require("./models/student.model"); // Student model
const Subjects = require("./models/subjects.model"); // Subjects model
const Results = require("./models/results.model"); // Results model
mongoose.connect("mongodb://127.0.0.1:27017/SCUStudents"); // mongoDB connection

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to SCU Students API");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}); // find all students
    res.json(students);
  } catch (error) {
    console.log(error.message);
  }
});

// Find by First name
app.get("/students/searchFirstName/:searchValue", async (req, res) => {
  try {
    const students = await Student.find({ firstName: req.params.searchValue });
    if (students.length > 0) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({ message: "No students found with that first name" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding student" });
  }
});

// Find by Last name
app.get("/students/searchLastName/:searchValue", async (req, res) => {
  try {
    const students = await Student.find({ lastName: req.params.searchValue });
    if (students.length > 0) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({ message: "No students found with that last name" });
    }
  } catch (error) {
    res.status(500).json({ message: "Student not found" });
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});


// test 11
var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose"); // mongoDB connection
const Student = require("./models/student.model");
const Subjects = require("./models/subjects.model");
const Results = require("./models/results.model");
mongoose.connect("mongodb://127.0.0.1:27017/SCUStudents");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Find by First name
app.get("/students/searchFirstName/:searchValue", async (req, res) => {
  try {
    const students = await Student.find({ firstName: req.params.searchValue });
    if (students.length > 0) {
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: "Student not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding student", error });
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
        .json({ message: "No students found with that first name" });
    }
  } catch (error) {
    res.status(500).json({ message: "Student not found", error });
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

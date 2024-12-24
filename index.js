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

//Dulashana
//Insert a New student
app.post("/students", async (req, res) => {
  const { sid, name, age, department } = req.body;

  if (!sid || !name || !age || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Student({ sid, name, age, department });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
});

//Show all Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); 
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
});

//Delete Student by sid
app.delete("/students/:sid", async (req, res) => {
  const { sid } = req.params;

  try {
    const deletedStudent = await Student.findOneAndDelete({ sid });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
});




app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

// test 11

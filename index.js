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
  // Destructuring the new student fields
  const { 
    sid, 
    firstName, 
    lastName, 
    email, 
    nearCity, 
    courses, 
    guardian, 
    subjects 
  } = req.body;

  // Check if required fields are provided
  if (!sid || !firstName || !lastName || !email || !nearCity || !courses || !guardian || !subjects) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new student instance with the provided details
    const newStudent = new Student({
      sid,
      firstName,
      lastName,
      email,
      nearCity,
      course: courses, // Renaming 'courses' to 'course' to match the schema
      guardian,
      subjects
    });

    // Save the new student to the database
    await newStudent.save();

    // Respond with a success message
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    // If an error occurs, respond with an error message
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
});


//Show all Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
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

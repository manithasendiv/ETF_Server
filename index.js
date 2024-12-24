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
app.post('/students/register', async (req, res) => {
  try {
    const student = await Student.create({
      sid: parseInt(req.body.sid), // Converting to integer
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      nearCity: req.body.nearCity,
      course: req.body.courses,
      guardian: req.body.guardian,
      subjects: req.body.subjects
    });

    // Check if student was created successfully
    if (!student) {
      return res.json({ status: 'error', message: "Type a unique id and email" });
    } else {
      return res.json({ status: 'ok', message: "Student inserted!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 'error', message: "Type a unique id and email" });
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

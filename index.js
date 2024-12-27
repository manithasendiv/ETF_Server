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
///////////////////////////////
// Get students by city
router.get('/city/:city', async (req, res) => {
  try {
      const students = await Student.find({ NearCity: req.params.city });
      res.status(200).json(students);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Get students by course
router.get('/course/:course', async (req, res) => {
  try {
      const students = await Student.find({ Course: req.params.course });
      res.status(200).json(students);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Get students by guardian
router.get('/guardian/:guardian', async (req, res) => {
  try {
      const students = await Student.find({ Guardian: req.params.guardian });
      res.status(200).json(students);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

///////////////////////////
app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

// test 11

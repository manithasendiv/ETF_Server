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
  let value = req.params.searchValue;
  try {
    const students = await Student.find({ firstName: value });
    if (students.length > 0) {
      res.send({ status: 200, message: students });
    } else {
      res.send({
        status: 400,
        message: "No students found with that first name",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Student not found" });
  }
});

// Find by Last name
app.get("/students/searchLastName/:searchValue", async (req, res) => {
  let value = req.params.searchValue;
  try {
    const students = await Student.find({ firstName: value });
    if (students.length > 0) {
      res.send({ status: 200, message: students });
    } else {
      res.send({
        status: 400,
        message: "No students found with that first name",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Student not found" });
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

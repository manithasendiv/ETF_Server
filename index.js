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

// Insert student
app.post('/students/register', async (req, res) =>{
  try {
      const student = await Student.create({
          sid: parseInt(req.body.sid),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          nearCity: req.body.nearCity,
          course: req.body.courses,
          guardian: req.body.guardian,
          subjects: req.body.subjects
      })

      if (!student) {
          res.json({status: 'error', message: "Type a unique id and email"});
      } else {
          res.json({status: 'ok', message: "Student inserted!"});
      }
  } catch (error) {
      console.log(error.message);
      res.json({status: 'error', message: "Type a unique id and email"});
  }
})

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

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

app.get("/students/searchEmail/:searchValue",async(req,res)=>{
  try{
    const students = await Student.find({email:req.params.searchValue}); 
    if(students.length > 0){
      res.status(200).json(students);
    }
    else{
      res.status(404).json({message:"No student found with that Email",error});
    }
  }
  catch(error){
    res.status(500).json({message:"Error finding student",error});
  }

});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});


// test 11
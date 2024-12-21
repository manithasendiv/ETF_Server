var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose'); // mongoDB connection
const Student = require('./models/student.model');
const Subjects = require('./models/subjects.model');
const Results = require('./models/results.model');
mongoose.connect('mongodb://127.0.0.1:27017/SCUStudents');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("students/searchSID/:searchvalue",async(req,res)=>{
  try{
    const students = await Student.findOne({sid:req.params.searchvalue}); 
    if(students.length > 0){
      res.status(200).json(students);
    }
    else{
      res.status(404).json({message:"No student found with that SID",error});
    }
  }
  catch(error){
    res.status(500).json({message:"Error finding student",error});
  }
})

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});


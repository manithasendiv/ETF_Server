var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get('/students', async (req, res) =>{
 res.send("student end point")
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});


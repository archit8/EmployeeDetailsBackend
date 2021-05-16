var express = require('express');  //load express module to crate instance of app
var mongoose = require('mongoose');
var Employee = require('./app/models/employee');
var multer  = require('multer');
var upload = multer();
const cors = require('cors');
var app = express();
//connect with mongo db.
mongoose.connect('mongodb://localhost:27017/csvdata');
var EmployeeController = require('./app/controllers/EmployeeController');
app.use(cors());
app.get('/listUsers', async(req, res) => {
    let employeeList = await Employee.find();
    console.log("employeeList", employeeList.length);
    res.json(employeeList);
});
app.post('/handleFile',upload.single('uploadCsv'), async function(req, res, next) {
    // req.file is the `uploadCsv` file 
    // req.body will hold the text fields, if there were any 
    console.log("request landed",req);
    // the buffer here containes your file data in a byte array 
    var csv=req.file.buffer.toString('utf8');
    var filePath = req.file.originalname;
   let temp = EmployeeController.employee.importEmployeeData(csv, filePath);
   res.json(temp);
});
app.listen(8000);
console.log('Express server listening on port ' + 8000);


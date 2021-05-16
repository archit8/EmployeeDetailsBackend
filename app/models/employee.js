/**
 * Created by Khemchandj on 2/4/2016.
 */
var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
    employeeCode: {type: String, required: true},
    firstName: String,
    lastName: String,
    age: Number,
    dob:String,
    reportingManager: String,
    annualSalary: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);

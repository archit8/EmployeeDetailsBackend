
const fs = require('fs');
const finalCsv = require('csv-parser');
var Employee = require('../models/employee');
module.exports.employee = {
    importEmployeeData: function (csv, filePath) {
        console.log("filePath",filePath);
        fs.createReadStream(__dirname + '/' + filePath)
        .pipe(finalCsv(csv))
        .on('data', (data) => {
                for (var key in data) {
                    data[key] = data[key].trim();
                }
                var employee = new Employee({
                    employeeCode: data['Employee Code'],
                    firstName: data['First Name'],
                    lastName: data['Last Name'],
                    age: data['age'],
                    dob: data['dob'],
                    reportingManager: data['reportingManager'],
                    annualSalary: data['Annual Salary']
                });
                employee.save(function (err) {
                    if (err) {
                        console.log("There is an error in processing employee data: " + err);
                    } else {
                        console.log("Employee data has been saved: " + data);
                    }
                })
            })
            .on("error", function (error) {
                console.log("There is an error in processing: " + error);
            })
            .on("end", function () {
                return {message: "Successfuly saved data"};
            });

    },

    readEmployeeData: function(req,res) {
        Employee.find().then( emp => {
            res.json({data: emp});
        });
    }
}

// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String},
  email: { type: String, required: true, unique:true },
  phoneNo: { type: Number, required: true },
  domain: { type: String}
});

const Employee = mongoose.model('Employees', employeeSchema);

module.exports = Employee;

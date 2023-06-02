// services/employeeService.js
const Employee = require('../models/employeeModel');

async function getAllEmployees() {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (err) {
    throw new Error('Failed to retrieve employees');
  }
}

async function getEmployeeById(employeeId) {
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  } catch (err) {
    throw new Error('Failed to retrieve employee');
  }
}

async function createEmployee(employeeData) {
  try {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
  } catch (err) {
    throw new Error('Failed to create employee');
  }
}

async function updateEmployee(employeeId, updatedEmployeeData) {
  try {
    const employee = await Employee.findByIdAndUpdate(employeeId, updatedEmployeeData, { new: true });
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  } catch (err) {
    throw new Error('Failed to update employee');
  }
}

async function deleteEmployee(employeeId) {
  try {
    const employee = await Employee.findByIdAndDelete(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return { message: 'Employee deleted successfully' };
  } catch (err) {
    throw new Error('Failed to delete employee');
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};

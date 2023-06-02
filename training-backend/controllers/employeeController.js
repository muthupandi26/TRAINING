// controllers/employeeController.js
const employeeService = require('../services/employeeService');

async function getAllEmployees(req, res, next) {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
}

async function getEmployeeById(req, res, next) {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.getEmployeeById(employeeId);
    res.json(employee);
  } catch (err) {
    next(err);
  }
}

async function createEmployee(req, res, next) {
  try {
    const bookData = req.body;
    const employee = await employeeService.createEmployee(bookData);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}

async function updateEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    const updatedBookData = req.body;
    const updatedBook = await employeeService.updateEmployee(employeeId, updatedBookData);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
}

async function deleteEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    await employeeService.deleteEmployee(employeeId);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};

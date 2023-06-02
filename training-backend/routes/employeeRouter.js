// routes/employees.js
const express = require('express');
const Joi = require('joi');
const employeeController = require('../controllers/employeeController');
const schemaValidation = require('../middlewares/schemaValidation');
const authValidation = require('../middlewares/authValidation');

const router = express.Router();

const createEmployeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().required(),
  phoneNo: Joi.number().required(),
  domain: Joi.string(),
});

router.get('/', authValidation, employeeController.getAllEmployees);
router.get('/:id', authValidation, employeeController.getEmployeeById);
router.post('/', authValidation, schemaValidation(createEmployeeSchema), employeeController.createEmployee);

router.put('/:id', authValidation,schemaValidation(createEmployeeSchema), employeeController.updateEmployee);
router.delete('/:id',authValidation, employeeController.deleteEmployee);

module.exports = router;
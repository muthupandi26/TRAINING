const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../middlewares/authValidation');

// Login endpoint
router.post('/login', authController.login);

// Logout endpoint
router.post('/logout', authValidation, authController.logout);

module.exports = router;

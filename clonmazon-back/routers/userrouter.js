const express = require('express');
const router = express.Router();

const userController = require('../controllers/usercontroller');

router.post('/register', userController.createUser);
router.post('/login', userController.login);

 module.exports = router;
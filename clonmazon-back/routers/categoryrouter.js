const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categorycontroller');


router.post('/register',categoryController.addCategory);
router.get('/:name', categoryController.getCategory);
router.get('/', categoryController.getCategory);


module.exports = router;
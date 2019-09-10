const express = require('express');
const router = express.Router();

const productController = require('../controllers/productcontroller');

router.post('/register', productController.addProduct);
router.get('/', productController.getProduct);
router.put('/',productController.updateProduct);


module.exports = router;
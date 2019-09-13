const express = require('express');
const router = express.Router();

const shoppingController = require('../controllers/shoppingcartcontroller');


router.post('/save',shoppingController.saveShoppingCartTemp);
router.put('/pay',shoppingController.payShoppingCart);
router.get('/',shoppingController.getShoppingCart);
router.put('/',shoppingController.updateShoppingCart)

module.exports = router;
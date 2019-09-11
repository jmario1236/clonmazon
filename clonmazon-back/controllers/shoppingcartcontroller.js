const shoppingcartService = require('../services/shoppingservice');


const saveShoppingCartTemp = async(req,res) => {
    try{
        let cart = {
            products: req.body.products,
            user: req.body.user
        }
        let savecart = await shoppingcartService.saveShoppingCart(cart);
        res.status(200).send(savecart);
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getShoppingCart = async(req,res) => {
    try{
        let filter = req.query.userid?{_id:req.query.userid}:{}
        let cart = await shoppingcartService.getShoppingTemp(filter);
        res.status(200).send(cart);
    }catch(err){
        res.status(500).send(err.message);
    }
}

const updateShoppingCart = async(req,res) => {
    try{
        let cartreq = {
            _id:req.body._id,
            products:req.body.products,
            user: req.body.user
        }
        let cart = await shoppingcartService.updateCart(cartreq);
        res.status(200).send(cart);  
    }catch(err){
        res.status(500).send(err.message);
    }
} 

module.exports = {saveShoppingCartTemp,getShoppingCart,updateShoppingCart}
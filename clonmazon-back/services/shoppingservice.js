const ShoppingCart = require('../models/shopping_cart');
const productService = require('./productservice');

const saveShoppingCart = async (cart) =>{
    try{
        let scart = ShoppingCart({
            products: cart.products,
            user: cart.user,
        });
        let savecart = await scart.save();
        return savecart;
    }catch(err){
        throw err;
    }
}

const updateCart = async(cart_p) => {
    try{
        let cart = await ShoppingCart.findOne({_id:cart_p._id});
        if(!cart){
            cart = saveShoppingCart(cart_p);
        }else{
            cart.products = cart_p.products;
            cart = await cart.save()
        }        
        cart = await cart.populate('products.product').execPopulate()
        return cart;
    }catch(err){
        throw err;
    } 
}


const getShoppingTemp = async (filter) =>{
    try{
        let cart = await ShoppingCart.find().populate({path:'user',match:filter.userid}).populate('products.product');
        return cart;
    }catch(err){
        throw err;
    }
}

const totalToPay = (products) => {
    let total = 0;
    products.forEach(productitem => {
        total += productitem.quantity * productitem.product.price;
    });
    return total;
}

const payShoppingCart = async (cart) => {
    try{
        let cart = await ShoppingCart.findById(cart._id);
        if(!cart){
            cart = await saveShoppingCart(cart);
        }
        cart.date_purchase = Date.now();
        cart.total = totalToPay(cart.products);
        productService.updateStock(cart.products);
        cart.save();
    }catch(err){
        throw err;
    }
}


module.exports = {saveShoppingCart, payShoppingCart, getShoppingTemp, updateCart};
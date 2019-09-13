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
        console.log("------- update")
        console.log(cart_p);
        let cart = await ShoppingCart.findOne({_id:cart_p._id});
        console.log("------- get find")
        console.log(cart);
        if(!cart){
            cart = await saveShoppingCart(cart_p);
        }else{
            cart.products = cart_p.products;
            cart = await cart.save()
        }        
        cart = await cart.populate('products.product').execPopulate();
        console.log("------- update get new cart")
        console.log(cart);
        return cart;
    }catch(err){
        throw err;
    } 
}


const getShoppingTemp = async (filter) =>{
    try{
        console.log("-------> ")
        console.log(filter);
        let cart = await ShoppingCart.find({user:filter}).populate({path:'user'}).populate('products.product');
        console.log("-------> "+cart);
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

const payShoppingCart = async (cart_p) => {
    try{
        console.log("-------> start pay")
        console.log(cart_p)
        let cart = await ShoppingCart.findById(cart_p._id)      
        if(!cart){
            cart = await saveShoppingCart(cart_p);
        }
        cart = await cart.populate('products.product').execPopulate();  
        console.log("-------> start found")
        console.log(cart.products.product)
        let result = await productService.checkStock(cart.products);
        if(result === true && !result.error){
            cart.date_purchase = Date.now();
            cart.total = totalToPay(cart.products);
            productService.updateStock(cart.products);
            cart = await cart.save();
        }else{
            throw result.error;
        }        
        return cart;
    }catch(err){
        throw err;
    }
}


module.exports = {saveShoppingCart, payShoppingCart, getShoppingTemp, updateCart};
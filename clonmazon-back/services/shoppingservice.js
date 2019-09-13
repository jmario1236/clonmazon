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

const checkStock = (products) => {
    try{
        let error = true;
        products.forEach((productitem) => {
            let product = productitem.product;
            if(!product){error = {error: "Product not exist!"}}
            if(product.stock === 0){error = {error: `The product ${product.name} not availiable!`}}
            if(product.stock < productitem.quantity){ error = {error: `The product ${product.name} exceeds the stock, availiable: ${product.stock}` }     }       
        });
        console.log("--- check stock ---")
        console.log(error)
        return error;
    }catch(err){
        throw err;
    }
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
        console.log(cart.products[0].product)
        cart.products.forEach((productitem) => {
            let productfromitem = productitem.product;
            console.log(productfromitem)
            if(!productfromitem){throw Error("Product not exist!")}
            if(productfromitem.stock === 0){throw Error(`The product ${productfromitem.name} not availiable!`)}
            if(productfromitem.stock < productitem.quantity){ throw Error(`The product ${productfromitem.name} exceeds the stock, availiable: ${productfromitem.stock}`) }       
        });        
        cart.date_purchase = Date.now();
        cart.total = totalToPay(cart.products);
        productService.updateStock(cart.products);
        cart = await cart.save();            
        return cart;
    }catch(err){
        throw err;
    }
}


module.exports = {saveShoppingCart, payShoppingCart, getShoppingTemp, updateCart};
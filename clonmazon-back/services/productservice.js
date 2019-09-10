const Product = require("../models/product");

const getProducts = async (filter) => {
    try{
        let products = await Product.find(filter.name)
            .populate({path:'categories',match:{$or:filter.categories}});        
        return products;
    }catch(err){
        throw err;
    }
};

const addProduct = async (product) =>{
    try{        
        let productsave = Product({
            name: product.name,
            description: product.description,
            url_image: product.url_image,
            price: product.price,
            stock: product.stock,
            categories: product.categories
        });
        const productnew = await productsave.save();
        return productnew;
    }catch(err){
        throw err;
    }
}

const deleteProduct = async (product) => {
    return Product.findByIdAndRemove(product._id);
}

const updateStock = async(products) => {
    try{
        products.forEach(async (productitem) => {
            let product = await Product.findById(productitem.product._id)
            if(!product){}
            if(product.stock === 0){}
            if(product.stock < productitem.quantity){}
            product.stock = product.stock - productitem.quantity;
            product.save();
        });
    }catch(err){
        throw err;
    }
};

const updateProductInfo = async (product) => {
    try{
        let productfind = await Product.findById(product._id)
        productfind.name = product.name?product.name:productfind.name
        productfind.description = product.description?product.description:productfind.description
        productfind.url_image = product.url_image?product.url_image:productfind.url_image
        productfind.price = product.price?product.price:productfind.price
        productfind.stock = product.stock?product.stock:productfind.stock
        productfind.categories = product.categories?product.categories:productfind.categories
        const nproductfind = await productfind.save();
        return nproductfind;
    }catch(err){
        throw err;
    } 
}

module.exports = {getProducts,addProduct,deleteProduct,updateStock,updateProductInfo}
const productService = require('../services/productservice');
const helper = require('../helper/helper');

const addProduct = async (req, res) =>{
    try{
        let product = {
            name: req.body.name,
            description: req.body.description,
            url_image: req.body.url_image,
            price: req.body.price,
            stock: req.body.stock,
            categories: req.body.categories
        }
        const newproduct = await productService.addProduct(product);
        res.status(200).send(newproduct);
    }catch(err){
        res.status(500).send(helper(err.message));
    }
}

const getProduct = async(req,res) => {
    try{
        let name = req.query.name;
        let categoriesq = req.query.categories;
        let _id = req.query._id;
        let filter = {name:{},categories:[{}]};
        if(_id){filter.name = {_id:_id}}
        if(name){filter.name = {name:new RegExp(req.query.name, "i")}}
        if(categoriesq){
            filter.name = {categories:[{_id:categoriesq}]};
        }
        console.log(filter);
        const products = await productService.getProducts(filter);
        res.status(200).send(products);
    }catch(err){
        res.status(500).send(helper(err.message));
    }
}

const updateProduct = async (req,res) => {
    try{
        let product = {
            _id: req.body._id,
            name: req.body.name,
            description: req.body.description,
            url_image: req.body.url_image,
            price: req.body.price,
            stock: req.body.stock,
            categories: req.body.categories
        }
        const newproduct = await productService.updateProductInfo(product);
        res.status(200).send(newproduct);
    }catch(err){
        res.status(500).send(helper(err.message));
    }
}


module.exports = {addProduct, getProduct, updateProduct};
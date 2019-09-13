const helper = require('../helper/helper');
const categoryService = require('../services/categoryservice');

const addCategory = async (req,res) => {
    try{
        let category = {
            name: req.body.name
        }
        const newcategory = await categoryService.addCategory(category);
        res.status(200).send(newcategory);
    }catch(err){
        res.status(500).send(helper(err.message));
    }
}

const getCategory = async (req,res) => {
    try{
        let filter = (req.params.name)?{
            name: new RegExp(req.params.name, "i")
        }:{};
        console.log(filter)
        const categories = await categoryService.getCategories(filter);
        res.status(200).send(categories);
    }catch(err){
        res.status(500).send(helper(err.message));
    }
}

module.exports = {addCategory,getCategory}
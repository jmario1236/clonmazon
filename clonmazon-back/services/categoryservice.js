const Category = require("../models/category");


const getCategories = async (filter) => {
    try{
        let categories = await Category.find(filter).exec();
        return categories;
    }catch(err){
        throw err;
    }
};

const addCategory = async (category_param) =>{
    try{
        let category = Category({
            name: category_param.name
        });
        const categorynew = await category.save();
        return categorynew;
    }catch(err){
        throw err;
    }
}

module.exports = {getCategories, addCategory}
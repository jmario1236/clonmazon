const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = Schema({
    name: {type: String},
    description: {type: String},
    url_image: {type: String},
    price: {type: Number},
    stock: {type: Number},
    categories: [{type: Schema.Types.ObjectId, ref:'Category'}]
});


module.exports = mongoose.model('Product',productSchema);
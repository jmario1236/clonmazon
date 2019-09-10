const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const shoppingcartSchema = Schema({
    products: [{
        quantity: {type: Number},
        product: {type: Schema.Types.ObjectId, ref:'Product'}
    }],
    user: {type: Schema.Types.ObjectId, ref:'User'},
    date_purchase: {type: Date},
    total: {type: Number}
});

module.exports = mongoose.model('ShoppingCart',shoppingcartSchema);
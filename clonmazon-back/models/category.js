const mongoose = require("mongoose");
mongoose.set('debug', true);
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {type:String}
});

module.exports = mongoose.model('Category',categorySchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username:   {type: String},
    fullname:   {type: String},
    admin:      {type: Boolean},
    email:      {type: String, index: true, unique: true},
    password:   {type: String},
    url_picture:{type: String}
},{timestamps:true});

userSchema.pre("save",async function (next) { 
    if(!this.isModified('password')){return next()};
    const passhashed = await bcrypt.hash(this.password,10);
    this.password = passhashed;
    next();    
},function(err){next(err)});

module.exports = mongoose.model('User',userSchema);
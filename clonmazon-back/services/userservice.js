const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../cons/cons");

const login = async (user) => {
    try{
        const loginuser = await existUser(user);
        const token = generateToken(loginuser);    
        const logininfo = {
            user: loginuser,
            token: token
        };
        return logininfo;        
    }catch(err){
        throw err; 
    }
};

const generateToken = (user) => {
    try{
        const payload = { user: user._id };
        const options = { expiresIn: constants.EXPIREIN, issuer: constants.ISSUER };
        return jwt.sign(payload, constants.SECRET_WORD, options);
    }catch(err){
        throw err;
    }
}

const registreUser = async (user) =>{
    try{
        const userdata = await existEmail(user);
        if(userdata){throw new Error(constants.EMAIL_EXIST)}
        const newuser = User({
            username:   user.username,
            email:      user.email,
            fullname:   user.fullname,
            password:   user.password,
            url_picture:user.url_picture
        });
        const data = await newuser.save()
        return data;
    }catch(err){
        throw err;
    }
};

const existEmail = async (user) => {
    try{
        const userfind = await User.findOne({email: user.email}).exec();
        return userfind
    }catch(err){
        throw err;
    } 
}

const existUser = async (user) => {
    try{
        const userfind = await existEmail(user);
        if(!userfind){throw new Error(constants.USER_NOTFOUND)};
        const resp = await bcrypt.compare(user.password,userfind.password);
        if(!resp){throw new Error(constants.INCORRECT_PASSWORD)}
        return userfind;
    }catch(err){
        throw err;
    }    
};

module.exports = {registreUser,login,existUser,existEmail};
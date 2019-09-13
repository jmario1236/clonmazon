const userservice = require("../services/userservice");
const constants = require("../cons/cons");
const helper = require('../helper/helper');

const createUser = async (req, res) => {
    try{
        let user = {
            username:   req.body.username,
            fullname:   req.body.fullname,
            admin:      false,
            email:      req.body.email,
            password:   req.body.password,
            url_picture:'#'
        }
        await userservice.registreUser(user);
        const login = await userservice.login(user);
        res.status(200).send(login);
    }catch(err){
        if(err.message === constants.EMAIL_EXIST){
            res.status(500).send(helper(constants.EMAIL_EXIST));
        }else{
            res.status(500).send(helper(err.message));
        }
    }
}

const login = async (req, res) => {
    try{
        let user = {
            email:      req.body.email,
            password:   req.body.password
        }
        const login = await userservice.login(user);
        res.status(200).send(login);
    }catch(err){
        res.status(500).send(helper(err.message));
    }   
}

module.exports = {createUser, login};

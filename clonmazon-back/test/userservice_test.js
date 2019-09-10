const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userService = require('../services/userservice');


mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/dbtest');
    mongoose.connection
        .once('open',() => {
            console.log('db conection from test'); 
            done();           
        })    
        .on('error', (err) => {
            console.error(err);
        });
});

const clearData = function(done, close){   
    mongoose.connection.db.listCollections().toArray(function(err,collections){
        collections.forEach((collection,index,array) => {
            if(collection.name === 'users'){
                mongoose.connection.db.dropCollection(collection.name,function(err,result){
                    console.log('db is clear')
                    if(close){
                        mongoose.connection.close(done);
                    }else{
                        done();
                    }                    
                });
            }
        });
    });  
}



describe("test for user registration services", function(){   

    before('drop data from users',function(done){
        this.timeout(10000);
        clearData(done,false);       
    });

    it('simple registration user test',async function(){
        this.timeout(10000);
        // set simple user information for registration service
        const user = {
            username:   'juliomario',
            email:      'jmario1236@gmail.com',
            password:   '1234567890',
            url_picture:'_blank'
        }
        const newuser = await userService.registreUser(user);
        
        assert.equal(newuser.username,user.username,'Not match data email');
        assert.equal(newuser.email,user.email, 'not match data email');
        const password = await bcrypt.compare(user.password,newuser.password);
        assert.isTrue(password,'not match data password');
    });

    it('Email not exist test', async function(){
        const user = {
            username:   'juliomario',
            email:      'jmario123sdfdsf6@gmail.com',
            password:   '1234567890',
            url_picture:'_blank'
        }
        const data = await userService.existEmail(user);
        console.log(data);
        assert.equal(data,null,'get data unexpect');
    });

    it('login user test', async function(){

        const user = {
            username:   'juliomario',
            email:      'jmario1236@gmail.com',
            password:   '1234567890',
            url_picture:'_blank'
        }
        const loginfo = await userService.login(user);
        const newuser = await loginfo.user;
        assert.equal(newuser.username,user.username,'Not match data email');
        assert.equal(newuser.email,user.email, 'not match data email');
        const password = await bcrypt.compare(user.password,newuser.password);
        assert.isTrue(password,'not match data password');
    });


    after(function(done){
        this.timeout(10000);
        clearData(done,true);
    })

});
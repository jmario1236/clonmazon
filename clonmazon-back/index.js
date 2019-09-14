const express = require("express");
const app = express();
const mongoose = require("mongoose");
const configuration = require("./configuration/configuration");
const bodyparser = require('body-parser');
var cors = require('cors')

// import router endpoints
const user = require('./routers/userrouter');
const product = require('./routers/productrouter');
const category = require('./routers/categoryrouter');
const shopping = require('./routers/shoppingrouter');


mongoose.Promise = global.Promise;

mongoose.connect(configuration.DBCONECTION,{useNewUrlParser: true})
    .then(() => {
        console.log("DB Online");
    }).catch(err => {
        console.log(err);
        process.exit();
    });
// Load middleware and endpoint
app.use(cors())
app.use(bodyparser.json());
app.use('/user',user);
app.use('/product',product);
app.use('/category',category);
app.use('/shopping',shopping);


app.listen(3001, () =>{
    console.log("Server listening on port 3001");
});


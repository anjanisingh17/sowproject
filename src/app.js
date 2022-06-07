require('dotenv').config();
const express = require('express');
const app = express();
const conn = require('./db/conn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_router = require('./routers/userRouter');
const User = require('./models/userModel');


app.use(express.json());
app.use(user_router);


app.get('/',(req,res)=>{
    res.send('Welcome to index page')    
});


// const createToken = async ()=>{
//     const token = jwt.sign({_id:'123456'},"Thisisjwttokenforeveryindividualuserusingjsonwebtoken");
//     console.log(token);
// }

// createToken();


app.listen(8080,()=>{
    console.log('App is listening on  port 8080');
});
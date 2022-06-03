const mongoose = require('mongoose');
const validator =  require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create Schema
const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: [true, "Email id already present"],
      validate(value){
          if(!validator.isEmail(value)){
            throw new Error('Invalid Email')
          }
      }
    },
    fname: {
      type: String,
      required: true,
      minlength:3
    },
    lname: {
      type: String,
      required: true,
      minlength:3
    },  
    password: {
      type: String,
      minlength:8,
      required: true
    },
    designation: {
        type : String,
        required : true
    },
    tokens : [{
          token : {
            type : String,
            required : false
          }
    }]
 
  });


  //generating web token 
  UserSchema.methods.generateWebToken = async function(){
    try{

      const webtoken = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:webtoken})
      await this.save();
      return webtoken;
    }
    catch(err){
      console.log('This error from userModel'+err)
    }
  }



//create a middleware for password hashing
UserSchema.pre("save", async function(next){
    if(this.isModified('password')){
      console.log(`password before hashing ${this.password}`);
      this.password = await bcrypt.hash(this.password,10);
      console.log(`password after hashing ${this.password}`);
    //   this.confirmPassword = undefined;
    }
     next();
  })


  //Create new collection
  const User = new mongoose.model('User',UserSchema);
  module.exports = User;
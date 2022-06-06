const mongoose = require('mongoose');
const validator =  require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create Schema
const projectSpaceSchema = new mongoose.Schema({
   projectName: {
      type: String,
      required: true,
      unique: true
    },
    avtarColor: {
      type: String,
      required: true,
      minlength:3
    },
    status: {
      type: String,
      required: true,
      minlength:2
    },  
    priority: {
      type: String,
      required: true
    },
    view: {
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
  projectSpaceSchema.methods.generateWebToken = async function(){
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


  //Create new collection
  const ProjectSpace = new mongoose.model('ProjectSpace',projectSpaceSchema);
  module.exports = ProjectSpace;
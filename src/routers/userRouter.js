const express = require('express')
const User = require('../models/userModel');
const ProjectSpace = require('../models/projectSpaceModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cookie } = require('express/lib/response');

const router = new express.Router();

//create user
router.post('/user_register',async(req,res)=>{
    
    try{
            const user = new User(req.body);

            //Getting webtoken from middleware
            const token =  await user.generateWebToken();

            res.cookie('jwt',token,{
                expires: new Date(Date.now() + 30000),
                httpOnly: true,
                // secure: true
            });
            // console.log(cookie);

            const result = await user.save();
            res.status(201).send(result); 

    }catch(err){
        res.status(400).send(err);
    } 
})


//Check login credentials
router.post('/user_login',async(req,res)=>{
    
    try{
            const email = req.body.email;
            const password = req.body.password;

            const userData = await User.findOne({"email":email});   
            const isMatch = await bcrypt.compare(password, userData.password);
             //Getting webtoken from middleware
            const token =  await userData.generateWebToken();
            console.log('login router'+token);

            if(isMatch){             
               res.status(200).send('Your have done login successfully!');  
            }else{
                res.send('Invalid login Details')
            }

    }catch(err){
        res.status(400).send(err);
    } 
})
 
//update the user by using id
router.patch('/user_update/:id',async(req,res)=>{

    try{
       const _id = req.params.id;
    
    //update data using findByIdAndUpdate method
       const userData = await User.findByIdAndUpdate(_id,req.body);

       res.status(201).send(userData); 
    }catch(err){
        res.status(500).send(err);
    }
})

// Delete the users record by id
router.delete('/user_delete/:id',async(req,res)=>{

    try{
       const _id = req.params.id;
       const userData = await User.findByIdAndDelete(_id);
       if(!userData){
          res.status(400).send('No data found for this id');  
       }else{
          res.status(200).send('Your record is deleted successfully');
       }

    }catch(err){
        res.status(500).send(err);
    }
})

//Register a projectSpace
router.post('/project_register',async(req,res)=>{
    
    try{
            const user = new ProjectSpace(req.body);

            //Getting webtoken from middleware
            const token =  await user.generateWebToken();
            const result = await user.save();
            res.status(201).send(result); 

    }catch(err){
        res.status(400).send(err);
    } 
})

//Read project data in detail
router.get('/project_read/:id',async(req,res)=>{

    try{
       const _id = req.params.id;
       const projectData = await ProjectSpace.findByIdAndDelete(_id);
       if(!projectData){
          res.status(400).send('No data found for this id');  
       }else{
          res.status(200).send(projectData);
       }

    }catch(err){
        res.status(500).send(err);
    }
});


//update the project details by using id
router.patch('/project_update/:id',async(req,res)=>{

    try{
       const _id = req.params.id;
    
    //update data using findByIdAndUpdate method
       const projectData = await ProjectSpace.findByIdAndUpdate(_id,req.body);

       res.status(201).send('your record is updated successfully'); 
    }catch(err){
        res.status(500).send(err);
    }
});


// Delete the project details record by id
router.delete('/project_delete/:id',async(req,res)=>{

    try{
       const _id = req.params.id;
       const projectData = await ProjectSpace.findByIdAndDelete(_id);
       if(!projectData){
          res.status(400).send('No data found for this id');  
       }else{
          res.status(200).send('Your record is deleted successfully');
       }

    }catch(err){
        res.status(500).send(err);
    }
});




module.exports = router;